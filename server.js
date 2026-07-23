import APIRoutes from "./routes/apiRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import CookieParser from "cookie-parser";
import Session from "express-session";
import { Strategy } from "passport-github2";
import UtilRoutes from "./routes/utilRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import userController from "./controllers/userController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
var user = {};

// app.use(cors({ origin: 'http://localhost:4173', credentials: true }));
app.use(cors({ origin: 'https://prota-2uja.onrender.com', credentials: true }));

//connect to MongodDB
const MONGODB_URI = process.env.MONGODB_URI
  || "mongodb://localhost/protadb";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

let session = Session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});

let strategy = new Strategy(
  {
    clientID: process.env.NODE_ENV === "production" ? process.env.GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.NODE_ENV === "production" ? process.env.GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
);

//use Github OAuth2 strategy
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((profile, done) => {
  if (!profile) done(null, {});
  user = {
    username: profile.username,
    avatar_url: profile._json.avatar_url, //profile.photos[0].value, 
    display_name: profile.displayName,
    email: (profile.emails ? profile.emails[0].value : null)
  }
  userController.createOrUpdate(user)
    .then(dbUser => done(null, dbUser))
    .catch(err => done(err, null));
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}
app.use(CookieParser());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Define API routes here

app.use("/auth", AuthRoutes(passport));
app.use("/api", APIRoutes);
app.use("/util", UtilRoutes);

// Send every other request to the React app
// Define any API routes before this runs

app.get(/./, (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    res.sendFile(path.join(__dirname, "./client/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "./client/index.html"));
  }
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

import CookieParser from "cookie-parser";
import Routes from "./routes/index.js";
import Session from "express-session";
import { Strategy } from "passport-github2";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from 'url';
import passport from "passport";
import path from "path";
import userController from "./controllers/userController.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.CORS_ORIGIN) {
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
}

const session = Session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,       // Required for SameSite=None
    sameSite: 'none',   // Allows cross-site requests
    maxAge: 1000 * 60 * 60 * 24
  }
});

const strategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
);

//use Github OAuth2 strategy
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((profile, done) => {
  if (!profile) done(null, {});
  const user = {
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

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}
app.use(CookieParser());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Define API routes here
app.use("/auth", Routes.Auth(passport));
app.use("/api", Routes.API);
app.use("/util", Routes.Util);

// Send every other request to the React app
// Define any API routes before this runs
app.get(/./, (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

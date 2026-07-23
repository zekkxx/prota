import {Router} from "express";

const router = Router();

export default (passport) => {
  router.get("/github", passport.authenticate("github"));

  router.get("/status", (req, res) => {
    req.user ? res.json(true) : res.json(false);
  });

  router.get(
    "/github/callback",
    passport.authenticate("github", (err, user) => {
      if (!err && user) req.login(user);
    }),
    (req, res) => {
      let redirectUrl;
      process.env.NODE_ENV === "production"
        ? (redirectUrl = "https://prota-2uja.onrender.com/")
        : (redirectUrl = "http://localhost:4173/");
      res.redirect(redirectUrl);
    }
  );
  
  router.delete("/logout", (req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }
      let redirectUrl;
      process.env.NODE_ENV === "production"
        ? (redirectUrl = "https://prota-2uja.onrender.com/")
        : (redirectUrl = "http://localhost:4173/");
      res.redirect(redirectUrl);
    });
  });

  return router;
};

var router = require("express").Router();

module.exports = passport => {
  router.get("/github", passport.authenticate("github"));

  router.get("/status", (req, res) => {
    req.user ? res.json(true) : res.json(false);
  });

  router.get(
    "/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      let redirectUrl;
      process.env.NODE_ENV === "production"
        ? (redirectUrl = "/")
        : (redirectUrl = "http://localhost:3000/");
      res.redirect(redirectUrl);
    }
  );
  
  router.delete("/logout", (req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }
      let redirectUrl;
      process.env.NODE_ENV === "production"
        ? (redirectUrl = "/")
        : (redirectUrl = "http://localhost:3000/");
      res.redirect(redirectUrl);
    });
  });

  return router;
};

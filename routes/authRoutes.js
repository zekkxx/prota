import {Router} from "express";

const router = Router();

export default (passport) => {
  router.get("/github", passport.authenticate("github"));

  router.get("/status", (req, res) => {
    req.user ? res.json(true) : res.json(false);
  });

  router.get(
    "/github/callback",
    passport.authenticate("github"),
    (req, res) => {
        let redirectUrl = process.env.FRONTEND_HOST;
        res.redirect(redirectUrl);
    }
  );

  router.post("/login", passport.authenticate("github"), (req, res) => {
    req.login(req.user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Login failed" });
        }
        res.json({ message: "Login successful" });
    });
  });
  
  router.delete("/logout", (req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }
      let redirectUrl = process.env.FRONTEND_HOST
      res.redirect(redirectUrl);
    });
  });

  return router;
};

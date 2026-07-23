import {Router} from "express";

const router = Router();

router.get("/user", (req, res) => {
  req.user ? res.json(req.user) : res.json({ error: true });
});

export default router;
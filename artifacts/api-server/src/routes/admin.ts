import { Router } from "express";
import jwt from "jsonwebtoken";
import { AdminLoginBody } from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "pitbull2024";
const JWT_SECRET = process.env.SESSION_SECRET ?? "pitbull-secret";

// POST /api/admin/login
router.post("/admin/login", (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Contraseña incorrecta" });
    return;
  }
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

// GET /api/admin/check
router.get("/admin/check", requireAdmin, (_req, res) => {
  res.json({ authenticated: true });
});

export default router;

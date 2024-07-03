import { Router } from "express";
import { login, logout } from "../controller/auth.controller.js";
import { check } from "express-validator";
import { verifyError } from "../middlewares/verifyError.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").notEmpty(),
    check("correo", "El correo no es válido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    verifyError,
  ],
  login
);

router.post("/logout", verifyJWT, logout);

export default router;

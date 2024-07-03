import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/users.controller.js";
import { verifyError } from "../middlewares/verifyError.js";
import { Router } from "express";
import {
  emailExists,
  rolExists,
  userStatusActive,
} from "../helpers/db-validation.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { verifyRols } from "../middlewares/verifyRols.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post(
  "/register",
  [
    check("nombre", "El nombre es requerido").notEmpty(),
    check("correo", "El correo es requerido").notEmpty(),
    check("correo", "Formato inavlido").isEmail(),
    check("correo").custom(emailExists),
    check("password", "La contraseña es requerida").notEmpty(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("rol", "El rol es requerido").notEmpty(),
    check("rol").custom(rolExists),
    verifyError,
  ],
  createUser
);

router.delete(
  "/:id",
  [
    verifyJWT,
    verifyRols("ADMINISTRADOR", "VEMDEDOR"),
    check("id").custom(userStatusActive),
    verifyError,
  ],
  deleteUser
);

router.put(
  "/:id",
  [
    verifyJWT,
    check("id").custom(userStatusActive),
    check("password", "La contraseña es requerida").notEmpty(),
    check("correo", "Formato inavlido").isEmail(),
    check("correo").custom(emailExists),
    verifyError,
  ],
  updateUser
);

export default router;

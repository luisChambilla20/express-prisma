import { Router } from "express";
import { check } from "express-validator";

import { getRols, postRol } from "../controller/rol.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { verifyRols } from "../middlewares/verifyRols.js";
import { verifyError } from "../middlewares/verifyError.js";

const router = Router();

router.get("/", [verifyJWT, verifyError], getRols);

router.post(
  "/",
  [
    verifyJWT,
    verifyRols("ADMINISTRADOR"),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    verifyError,
  ],
  postRol
);

export default router;

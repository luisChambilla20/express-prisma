import { Router } from "express";
import { check } from "express-validator";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controller/categories.controller.js";

import { verifyError } from "../middlewares/verifyError.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { categoryExists, categoryIsActive } from "../helpers/db-validation.js";

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post(
  "/",
  [
    verifyJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(categoryExists),
    verifyError,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    verifyJWT,
    check("id").custom(categoryIsActive),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(categoryExists),
    verifyError,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [verifyJWT, check("id").custom(categoryIsActive), verifyError],
  deleteCategory
);

export default router;

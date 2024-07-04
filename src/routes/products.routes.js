import { Router } from "express";
import { check } from "express-validator";

import {
  getProduct,
  getProducts,
  postProducts,
  updateProduct,
  deleteProduct,
} from "../controller/products.controller.js";

import { verifyJWT } from "../middlewares/verifyJWT.js";
import { verifyError } from "../middlewares/verifyError.js";
import {
  categoryIsActive,
  productExists,
  productIsActive,
} from "../helpers/db-validation.js";
import { verifyPriceValid } from "../middlewares/verifyPriceValid.js";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [check("id").custom(productIsActive), verifyError],
  getProduct
);

router.post(
  "/",
  [
    verifyJWT,
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre").custom(productExists),
    check("categoria", "La categoria es requerida").notEmpty(),
    check("categoria").custom(categoryIsActive),
    verifyPriceValid,
    verifyError,
  ],
  postProducts
);

router.put(
  "/:id",
  [
    verifyJWT,
    check("id", "El id es requerido").notEmpty(),
    check("id").custom(productIsActive),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre").custom(productExists),
    verifyPriceValid,
    verifyError,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    verifyJWT,
    check("id", "El id es requerido").notEmpty(),
    check("id").custom(productIsActive),
    verifyError,
  ],
  deleteProduct
);

export default router;

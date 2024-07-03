import { request, response } from "express";
import prisma from "../config/db.js";

const verifyRols = (...roles) => {
  return async (req = request, res = response, next) => {
    console.log(req.user);

    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }

    const rolFound = await prisma.rol.findFirst({
      where: { nombre: req.user.rol },
    });

    if (!roles.includes(rolFound.rol)) {
      return res
        .status(401)
        .json({ msg: `El servicio requiere uno de estos roles ${roles}` });
    }

    next();
  };
};

export { verifyRols };

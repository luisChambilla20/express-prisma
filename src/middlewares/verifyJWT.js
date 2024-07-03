import { request, response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

const verifyJWT = async (req = request, res = response, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);

    const userFound = await prisma.usuario.findFirst({
      where: {
        Id: +user,
      },
    });

    if (!userFound || userFound.estado == false) {
      return res.status(401).json({
        msg: "Usuario no encontrado o deshabilitado",
      });
    }

    req.user = userFound;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export { verifyJWT };

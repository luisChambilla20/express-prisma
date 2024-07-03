import { request, response } from "express";
import bycript from "bcryptjs";
import prisma from "../config/db.js";
import { generateJWT } from "../helpers/generate-jwt.js";

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const userFound = await prisma.usuario.findFirst({
      where: {
        correo,
      },
    });

    if (!userFound) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos - email",
      });
    }

    const validatePassword = bycript.compareSync(password, userFound.password);

    if (!validatePassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos - password",
      });
    }

    // SE GENERA EL JWT Y SE GUARDA EN LAS COOKIES
    const token = await generateJWT(userFound.Id);

    // GENERAR COOKIE
    const optionsCookie = {
      expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // SE GUARDAN LAS COOKIES
    res.cookie("jwt", token, optionsCookie);

    return res.status(200).json({
      msg: "Login correcto",
      userFound,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const logout = async (req = request, res = response) => {
  // SE LIMPIAN LAS COOKIES
  res.clearCookie("jwt");

  res.status(200).json({
    msg: "Logout correcto",
  });
};

export { login, logout };

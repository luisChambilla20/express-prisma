import { request, response } from "express";
import prisma from "../config/db.js";
import bcrypt from "bcryptjs";

const createUser = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        password: passwordHash,
        rolId: +rol,
      },
    });

    res.status(201).json({
      msg: "Usuario creado",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  let { nombre, correo, password, rol } = req.body;

  if (password) {
    // SI SE ACTUALIZA LA CONTRASEÑA SE ENCRIPTA
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
  }

  const userUpdated = await prisma.usuario.update({
    where: {
      Id: +id,
    },
    data: {
      nombre,
      correo,
      password,
      rolId: +rol,
    },
  });

  res.status(200).json({
    msg: "Usuario actualizado",
    userUpdated,
  });

  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await prisma.usuario.update({
      where: {
        Id: +id,
      },
      data: {
        estado: false,
      },
    });

    res.status(200).json({
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const getUsers = async (req = request, res = response) => {
  // SE OBTIENE LA LISTA DE USUARIOS ACTIVOS
  const users = await prisma.usuario.findMany({
    where: {
      estado: true,
    },
    select: {
      nombre: true,
      correo: true,
      img: true,
      rolId: true,
    },
  });

  res.status(200).json({
    users,
  });
};

const getUser = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // SE OBTIENE EL USUARIO POR ID
    const user = await prisma.usuario.findUnique({
      where: {
        Id: +id,
        estado: true,
      },
      select: {
        nombre: true,
        correo: true,
        img: true,
        rolId: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado o eliminado",
      });
    } else {
      res.status(200).json({
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export { createUser, updateUser, deleteUser, getUsers, getUser };

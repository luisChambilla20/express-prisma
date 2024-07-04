import { request, response } from "express";
import prisma from "../config/db.js";

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      msg: "El id es obligatorio",
    });
  }

  try {
    const categoryFound = await prisma.categoria.findFirst({
      where: {
        Id: +id,
      },
    });

    res.status(200).json({
      categoryFound,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const getCategories = async (req = request, res = response) => {
  try {
    const categories = await prisma.categoria.findMany();

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const createCategory = async (req = request, res = response) => {
  const { nombre } = req.body;

  console.log(req.user);

  try {
    const newCategory = await prisma.categoria.create({
      data: {
        nombre,
        usuarioId: +req.user.Id,
      },
    });

    res.status(201).json({
      msg: "Categoria creada",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const categoryFound = await prisma.categoria.update({
      where: {
        Id: +id,
      },
      data: {
        nombre,
      },
    });

    res.status(200).json({
      msg: "Categoria actualizada",
      categoryFound,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await prisma.categoria.update({
      where: {
        Id: +id,
      },
      data: {
        estado: false,
      },
    });

    res.status(200).json({
      msg: "Categoria eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

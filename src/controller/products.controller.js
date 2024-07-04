import { request, response } from "express";
import prisma from "../config/db.js";

const getProducts = async (req = request, res = response) => {
  try {
    const products = await prisma.productos.findMany({
      where: {
        estado: true,
      },
      select: {
        nombre: true,
        precio: true,
        descripcion: true,
        categoriaId: true,
        usuarioId: true,
      },
    });

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hable con el administrador",
    });
  }
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const productFound = await prisma.productos.findFirst({
      where: {
        Id: +id,
      },
    });

    if (!productFound) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      productFound,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hable con el administrador",
    });
  }
};

const postProducts = async (req = request, res = response) => {
  const { nombre, descripcion, categoria } = req.body;
  const { Id } = req.user;

  let parsedPrecio;

  if (req.priceParsed) {
    parsedPrecio = req.priceParsed;
  }

  try {
    const newProduct = await prisma.productos.create({
      data: {
        nombre: nombre,
        precio: parsedPrecio,
        descripcion: descripcion,
        categoriaId: +categoria,
        usuarioId: Id,
      },
    });

    res.status(201).json({
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hable con el administrador",
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await prisma.productos.update({
      where: {
        Id: +id,
      },
      data: {
        estado: false,
      },
    });

    res.status(200).json({
      message: "Producto eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hable con el administrador",
    });
  }
};

const updateProduct = async (req = request, res = response) => {
  const { nombre, descripcion, categoria } = req.body;
  const { Id } = req.user;

  let parsedPrecio;

  if (req.priceParsed) {
    parsedPrecio = req.priceParsed;
  }

  try {
    const newProduct = await prisma.productos.create({
      data: {
        nombre: nombre,
        precio: parsedPrecio,
        descripcion: descripcion,
        categoriaId: +categoria,
        usuarioId: Id,
      },
    });

    res.status(201).json({
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hable con el administrador",
    });
  }
};

export { getProduct, getProducts, postProducts, deleteProduct, updateProduct };

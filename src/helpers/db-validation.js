import prisma from "../config/db.js";

const rolExists = async (rol = "") => {
  const rolFound = await prisma.rol.findFirst({
    where: {
      Id: +rol,
    },
  });

  if (!rolFound) {
    throw new Error(`El rol ${rol} no existe`);
  }
};

const emailExists = async (correo = "") => {
  const emailExists = await prisma.usuario.findFirst({
    where: {
      correo,
    },
  });

  if (emailExists) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

const userStatusActive = async (id) => {
  const user = await prisma.usuario.findUnique({
    where: {
      Id: +id,
    },
  });

  if (!user.estado) {
    throw new Error(`El usuario ${id} no existe o está deshabilitado`);
  }
};

const categoryExists = async (nombre = "") => {
  const category = await prisma.categoria.findUnique({
    where: {
      nombre,
    },
  });

  if (category) {
    throw new Error(`La categoria ${nombre} existe`);
  }
};

const categoryIsActive = async (id) => {
  if (isNaN(id)) {
    throw new Error("Formato de Id invalido");
  }

  const category = await prisma.categoria.findUnique({
    where: {
      Id: +id,
    },
  });

  if (!category) {
    throw new Error(`La categoria ${id} no existe`);
  }

  if (!category.estado) {
    throw new Error(`La categoria ${id} no existe o está deshabilitada`);
  }
};

const productExists = async (nombre = "") => {
  const product = await prisma.productos.findFirst({
    where: {
      nombre,
    },
  });

  if (product) {
    throw new Error(`El producto ${nombre} ya existe`);
  }
};

const productIsActive = async (id) => {
  if (isNaN(id)) {
    throw new Error("Formato de Id invalido");
  }

  const product = await prisma.productos.findUnique({
    where: {
      Id: +id,
    },
  });

  console.log(product);
  
  if (!product) {
    throw new Error(`El producto ${id} no existe`);
  }

  if (!product.estado) {
    throw new Error(`El producto ${id} no existe o está deshabilitado`);
  }
};

export {
  rolExists,
  emailExists,
  userStatusActive,
  categoryExists,
  categoryIsActive,
  productExists,
  productIsActive,
};

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

export { rolExists, emailExists, userStatusActive };

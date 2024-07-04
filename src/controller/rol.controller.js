import prisma from "../config/db.js";

const getRols = async (req, res) => {
  try {
    const rols = await prisma.rol.findMany();

    res.status(200).json({
      rols,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const postRol = async (req, res) => {
  const { nombre } = req.body;

  try {
    const newRol = await prisma.rol.create({
      data: {
        rol: nombre,
      },
    });

    res.status(201).json({
      newRol,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export { getRols, postRol };

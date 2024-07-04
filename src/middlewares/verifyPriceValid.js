import { request, response } from "express";

const verifyPriceValid = (req = request, res = response, next) => {
  const { precio } = req.body;

  if (!precio) {
    return next();
  }

  //CONVERTIR PRECIO A FLOAT
  let parsedPrecio = parseFloat(precio);

  if (isNaN(parsedPrecio)) {
    return res.status(400).json({
      message: "El precio debe ser un número válido",
    });
  }

  req.priceParsed = parsedPrecio;

  next();
};

export { verifyPriceValid };

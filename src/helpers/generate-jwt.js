import jwt from "jsonwebtoken";

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    const payload = { user };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generateJWT };

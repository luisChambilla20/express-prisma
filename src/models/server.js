import express from "express";
import cors from "cors";
import "dotenv/config.js"; // Asegúrate de que este import esté al inicio

import authRoutes from "../routes/auth.routes.js";
import usersRoutes from "../routes/users.routes.js";
import categoriesRoutes from "../routes/categories.routes.js";
import productsRoutes from "../routes/products.routes.js";
import rolsRoutes from "../routes/rols.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 9000;

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      rols: "/api/rols",
    };

    // SE LLAMAN LOS MIDDLEWARES
    this.middlewares();

    // SE LLAMAN LAS RUTAS
    this.routes();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(cookieParser());
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.users, usersRoutes);
    this.app.use(this.paths.categories, categoriesRoutes);
    this.app.use(this.paths.rols, rolsRoutes);
    this.app.use(this.paths.products, productsRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;

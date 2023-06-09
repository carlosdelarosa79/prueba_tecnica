const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");
// se crea una clase con constructor
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.userPath = "/api/user";
    this.authPath = "/api/auth";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/Auth"));
    this.app.use(this.userPath, require("../routes/User"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;

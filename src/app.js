const express = require("express");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");

require("dotenv").config();

class App {
  constructor() {
    this.server = express();
    async function handleConnection() {
      mongoose
        .connect(process.env.URL_MONGO, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        })
        .catch((e) => {
          if (e) {
            handleConnection();
          }
        });
    }
    mongoose.connection.once("open", () =>
      console.log("Successfully connected to MongoDB")
    );
    mongoose.connection.on("error", (e) => console.log("Falha de conexão."));
    handleConnection();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(fileUpload());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;

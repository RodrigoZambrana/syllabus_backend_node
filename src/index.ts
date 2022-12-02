import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import "reflect-metadata";

import express = require("express");

const PORT = process.env.PORT || 8080;
const app = express();

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT);
    console.log("Server on port", PORT);
  })
  .catch((error) => console.log(error));

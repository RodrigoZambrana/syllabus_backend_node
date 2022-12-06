import { AppDataSource } from "./data-source";
import "reflect-metadata";
import app from "./endpoints";

const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(async () => {
    app.get("/", (req, res) => {
      res.send("🎉 App running ok! 🎉");
    });

    app.listen(PORT);
    console.log("Server on port", PORT);
  })
  .catch((error) => console.log(error));

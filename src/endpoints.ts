import express from "express";
import userRoutes from "./routes/common/userRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", userRoutes);

export default app;

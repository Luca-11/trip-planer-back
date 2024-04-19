import express from "express";

import cors from "cors";
import dotenv from "dotenv";

import V1Router from "./routes/v1.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONT_ORIGIN],
  })
);

app.use("/v1", V1Router);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

import express from "express";

import cors from "cors";

import V1Router from "./routes/v1.js";

// import session from "express-session";

// import https from "https";

// import dotenv from "dotenv";

const app = express();

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5501"],
  })
);

app.use("/v1", V1Router);

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

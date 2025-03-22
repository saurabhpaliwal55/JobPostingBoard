import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "./routes/register.route.js";

app.use("/api/user", userRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
);

export { app };

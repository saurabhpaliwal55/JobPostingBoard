import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDB } from "./connectDB.js";

const PORT = process.env.PORT || 3030;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});

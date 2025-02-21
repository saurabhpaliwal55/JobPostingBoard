import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./connectDB.js";

dotenv.config();
const PORT = process.env.PORT || 3030;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});

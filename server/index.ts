import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getCharacters, postChat } from "./controllers/chatController";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

dotenv.config({ path: "config.env" });

app.use(express.json());

// Use the controllers
app.get("/characters", getCharacters);
app.post("/chat", postChat);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

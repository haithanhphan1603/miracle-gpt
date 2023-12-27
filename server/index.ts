import express, { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

dotenv.config({ path: "config.env" });

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

app.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    // Call the OpenAI API to get a response
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
    });

    const botResponse =
      completion.choices[0]?.message ||
      "I am sorry, I did not understand that.";

    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express, { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionMessageParam,
} from "openai/resources";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

dotenv.config({ path: "config.env" });

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// Store the conversation history
let conversationHistory: ChatCompletionMessageParam[] = [
  {
    role: "assistant",
    content: "Act like you are Charles Darwin and never leave that role",
  },
];

app.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    // Add the user's message to the conversation history
    conversationHistory.push({ role: "user", content: message });

    // Call the OpenAI API to get a response
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-3.5-turbo",
    });

    const botResponse =
      completion.choices[0]?.message.content ||
      "I am sorry, I did not understand that.";

    // Add the bot's response to the conversation history
    conversationHistory.push({
      role: "assistant",
      content: botResponse,
    });
    console.log(botResponse);

    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

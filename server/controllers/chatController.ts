import { Request, Response } from "express";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { characters, Character } from "../models/Character";

// Store the conversation history for each character
let conversationHistories: { [key: string]: ChatCompletionMessageParam[] } = {};

// Initialize the conversation history for each character
characters.forEach((character) => {
  conversationHistories[character.name] = [
    {
      role: "assistant",
      content: character.prompt,
    },
  ];
});

export const getCharacters = (req: Request, res: Response) => {
  res.status(200).json(characters);
};

export const postChat = async (req: Request, res: Response) => {
  try {
    const { message, characterName } = req.body;

    // If the character does not exist, return an error
    if (!conversationHistories[characterName]) {
      return res.status(400).json({ error: "Invalid character" });
    }

    // Add the user's message to the conversation history
    conversationHistories[characterName].push({
      role: "user",
      content: message,
    });

    // Call the OpenAI API to get a response
    const openai = new OpenAI({ apiKey: process.env.API_KEY });
    const completion = await openai.chat.completions.create({
      messages: conversationHistories[characterName],
      model: "gpt-3.5-turbo",
    });

    const botResponse =
      completion.choices[0]?.message.content ||
      "I am sorry, I did not understand that.";

    // Add the bot's response to the conversation history
    conversationHistories[characterName].push({
      role: "assistant",
      content: botResponse,
    });
    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

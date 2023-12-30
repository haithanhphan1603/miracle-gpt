// models/Character.ts

import fs from "fs";
import path from "path";

export interface Character {
  name: string;
  avatarImage: string;
  tone: string;
  familiarField: string;
  initialMessage: string;
}

export const characters: Character[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../assets/characters.json"), "utf-8")
);
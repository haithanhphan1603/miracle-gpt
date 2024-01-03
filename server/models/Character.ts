// models/Character.ts

import fs from "fs";
import path from "path";

export interface Character {
  name: string;
  avatarImage: string;
  dateOfBirth: string;
  prompt: string;
  gender: Gender;
  description: string;
  profession: string;
}

enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export const characters: Character[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../assets/characters.json"), "utf-8")
);

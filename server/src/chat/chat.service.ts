import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openAI = null;

  async create(createChatDto: CreateChatDto, apiKey: string) {
    this.openAI = new OpenAI({ apiKey });
    const response = await this.openAI.chat.comp({
      model: 'gpt-3.5-turbo',
      messages: [createChatDto.message],
    });

    return response.data.choices[0].message['content'];
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}

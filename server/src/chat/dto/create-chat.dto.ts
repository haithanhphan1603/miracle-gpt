import { ChatCompletionMessageParam } from 'openai/resources';

export class CreateChatDto {
  message: ChatCompletionMessageParam[];
}

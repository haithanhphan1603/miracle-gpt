export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export enum ChatMode {
  NORMAL = 'normal',
  MESSENGER = 'messenger'
}

export interface Chat {
  messages: Message[]
  responses: Message[]
}

interface Message {
  content: string
  time: Date
}

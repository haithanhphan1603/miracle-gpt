export interface Chat {
  conversation: ConversationItem[]
}

export interface ConversationItem {
  question: Message
  response: Message
}

interface Message {
  content: string
  time: Date
}

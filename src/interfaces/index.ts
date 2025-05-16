
export interface AskDocxRequest {
  question: string;
}
export interface Message {
  text: string;
  isUser: boolean;
}

export interface QuestionPayload {
  user_input: string;
}

export interface ApiResponse {
  answer: string;
}
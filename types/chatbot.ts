import {
  chatbotCharacteristicsSchema,
  chatbotSchema,
  getChatbotByIdResponseSchema,
} from "@/schema/chatbot";
import { z } from "zod";

export type ChatbotCharacteristics = z.infer<
  typeof chatbotCharacteristicsSchema
>;
export type Chatbot = z.infer<typeof chatbotSchema>;
export type GetChatbotByIdRequestVariables = { id: string };
export type GetChatbotByIdResponse = z.infer<
  typeof getChatbotByIdResponseSchema
>;

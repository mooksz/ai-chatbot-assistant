import { z } from "zod";
import { chatSessionSchema } from "./chat";

export const chatbotCharacteristicsSchema = z.object({
  id: z.number(),
  chatbot_id: z.number(),
  content: z.string(),
  created_at: z.string().datetime(),
});

export const chatbotSchema = z.object({
  id: z.number(),
  clerk_user_id: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
  chatbot_characteristics: z.array(chatbotCharacteristicsSchema),
});

export const getChatbotByIdResponseSchema = z.object({
  chatbots: chatbotSchema,
});

import { z } from "zod";

export const chatbotCharacteristicsSchema = z.object({
  id: z.number(),
  chatbot_id: z.number(),
  content: z.string(),
  created_at: z.string().datetime(),
});

export const chatbotsChatSessionsSchema = z.object({
  id: z.number(),
  chatbot_id: z.number(),
  guest_id: z.number(),
});

export const chatbotSchema = z.object({
  id: z.number(),
  clerk_user_id: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
  chatbot_characteristics: z.array(chatbotCharacteristicsSchema),
  chat_sessions: z.array(chatbotsChatSessionsSchema),
});

export const getChatbotByIdResponseSchema = z.object({
  chatbots: chatbotSchema,
});

import { z } from "zod";
import { guestSchema } from "./guest";

export const messageSchema = z.object({
  id: z.number(),
  chat_session_id: z.number(),
  content: z.string(),
  created_at: z.string().datetime(),
  sender: z.enum(["ai", "user"]),
});

export const chatSessionSchema = z.object({
  id: z.number(),
  chatbot_id: z.number(),
  guest_id: z.number().nullable(),
  created_at: z.string().datetime(),
  messages: z.array(messageSchema),
  guests: guestSchema,
});

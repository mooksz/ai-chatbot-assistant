import { messageSchema, chatSessionSchema } from "@/schema/chat";
import { z } from "zod";

export type Message = z.infer<typeof messageSchema>;
export type ChatSession = z.infer<typeof chatSessionSchema>;

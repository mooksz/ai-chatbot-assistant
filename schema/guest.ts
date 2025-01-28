import { z } from "zod";

export const guestSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  created_at: z.string().datetime(),
});

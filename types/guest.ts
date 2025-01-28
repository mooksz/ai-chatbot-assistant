import { guestSchema } from "@/schema/guest";
import { z } from "zod";

export type Guest = z.infer<typeof guestSchema>;

import { z } from "zod";

export const NewPromcodeSchema = z.object({
  userId: z.string(),
  code: z.string(),
  type: z.string(),
  discount: z.number().nonnegative(),
  maxDiscount: z.number().nonnegative().nullish(),
  start: z.date(),
  end: z.date(),
});

export type NewPromcodeSchemaType = z.infer<typeof NewPromcodeSchema>;
import { z } from "zod";

export const NewPromcodeSchema = z.object({
  userId: z.string(),
  code: z.string(),
  type: z.string(),
  discount: z.number().nonnegative(),
  maxDiscount: z.number().nonnegative().nullish(),
  start: z.string(),
  end: z.string(),
});

export type NewPromcodeSchemaType = z.infer<typeof NewPromcodeSchema>;

export const UpdatePromocodeSchema = z.object({
  id: z.number(),
  code: z.string().nullable(),
  discount: z.number().nonnegative().nullable(),
  maxDiscount: z.number().nonnegative().nullable(),
  start: z.string().nullable(),
  end: z.string().nullable(),
});

export type UpdatePromocodeSchemaType = z.infer<typeof UpdatePromocodeSchema>;
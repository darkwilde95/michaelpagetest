import { z } from "zod";

export const abandonApplicationSchema = z.object({
  abandonmentReason: z.string().min(1, "La razón es requerida."),
});

export type AbandonmentApplicationDto = z.infer<
  typeof abandonApplicationSchema
>;

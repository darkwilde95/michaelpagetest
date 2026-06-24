import { z } from "zod";

export const abandonApplicationSchema = z.object({
  abandonmentReason: z
    .string({
      message: "El motivo de desistimiento es obligatorio.",
    })
    .min(1, {
      message:
        "Debe especificar una razón válida para el abandono de la solicitud.",
    }),
});

export type AbandonmentApplicationDto = z.infer<
  typeof abandonApplicationSchema
>;

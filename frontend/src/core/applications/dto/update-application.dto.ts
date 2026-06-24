import { z } from "zod";

export const updateApplicationSchema = z.object({
  income: z
    .number({
      message: "Los ingresos mensuales deben ser un valor numérico.",
    })
    .nonnegative({
      message: "Los ingresos mensuales no pueden ser valores negativos.",
    })
    .optional(),
  expenses: z
    .number({
      message: "Los egresos mensuales deben ser un valor numérico.",
    })
    .nonnegative({
      message: "Los egresos mensuales no pueden ser valores negativos.",
    })
    .optional(),
  requestedAmount: z
    .number({
      message: "El monto solicitado debe ser un valor numérico.",
    })
    .nonnegative({
      message: "El monto solicitado no puede ser un valor negativo.",
    })
    .optional(),
  desiredTerm: z
    .number({
      message: "El plazo solicitado debe ser un valor numérico.",
    })
    .nonnegative({
      message: "El plazo solicitado no puede ser un valor negativo.",
    })
    .optional(),
  loanPurpose: z
    .string({
      message: "El destino del crédito debe ser una cadena de texto.",
    })
    .optional(),
});

export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>;

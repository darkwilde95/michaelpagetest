import { z } from "zod";

export const updateApplicationSchema = z.object({
  income: z.number().nonnegative().optional(),
  expenses: z.number().nonnegative().optional(),
  requestedAmount: z.number().nonnegative().optional(),
  desiredTerm: z.number().nonnegative().optional(),
  loanPurpose: z.string().optional(),
});

export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>;

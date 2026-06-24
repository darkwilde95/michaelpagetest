import { type ZodSafeParseError, ZodObject } from "zod";

export const formatValidationErrors = <S>(result: ZodSafeParseError<S>) => {
  const formattedErrors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as string;
    formattedErrors[field] = issue.message;
  });
  return formattedErrors;
};

import { z } from "zod";
import { CustomerChannel, DocumentType } from "../types";
import { selectChannelSchema } from "./select-channel.dto";

export const createApplicationSchema = selectChannelSchema
  .extend({
    documentType: z.nativeEnum(DocumentType, {
      error: "El tipo de documento seleccionado no es válido.",
    }),
    documentNumber: z
      .string({ message: "El número de documento es obligatorio." })
      .min(1, {
        message: "El número de documento de identidad es obligatorio.",
      }),
    fullName: z
      .string({ message: "El nombre completo es obligatorio." })
      .min(1, {
        message:
          "Debe ingresar su nombre completo tal como aparece en su documento.",
      }),
    phoneNumber: z
      .string({ message: "El número de teléfono es obligatorio." })
      .min(1, {
        message:
          "El número de contacto celular es requerido para la validación.",
      }),
    email: z
      .string({ message: "El correo electrónico es obligatorio." })
      .email({
        message:
          "La dirección de correo electrónico ingresada no tiene un formato válido.",
      }),
    city: z.string({ message: "La ciudad es obligatoria." }).min(1, {
      message: "La ciudad de residencia es obligatoria.",
    }),
  })
  .refine(
    (data) => {
      if (
        data.channel === CustomerChannel.ASSISTED &&
        (!data.advisorId || data.advisorId.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "El código de identificación del asesor es obligatorio para el canal asistido.",
      path: ["advisorId"],
    },
  );

export type CreateApplicationDto = z.infer<typeof createApplicationSchema>;

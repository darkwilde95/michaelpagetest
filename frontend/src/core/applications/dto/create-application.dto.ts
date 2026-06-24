import { z } from "zod";
import { CustomerChannel, DocumentType } from "../types";
import { selectChannelSchema } from "./select-channel.dto";

export const createApplicationSchema = selectChannelSchema
  .extend({
    documentType: z.enum(DocumentType),
    documentNumber: z.string().min(1, "El número de documento es obligatorio"),
    fullName: z.string().min(1, "El nombre completo es obligatorio"),
    phoneNumber: z.string().min(1, "El numero es obligatorio"),
    email: z.email("El correo electrónico no es válido"),
    city: z.string().min(1, "La ciudad es obligatoria"),
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
      message: "El id del asesor es obligatorio cuando el canal es asistido",
      path: ["advisorId"],
    },
  );

export type CreateApplicationDto = z.infer<typeof createApplicationSchema>;

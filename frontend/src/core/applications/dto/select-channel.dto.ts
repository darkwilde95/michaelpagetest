import { z } from "zod";
import { CustomerChannel } from "../types";

export const selectChannelSchema = z
  .object({
    channel: z.enum(CustomerChannel, {
      error: "El canal seleccionado no corresponde a un entorno autorizado.",
    }),

    advisorId: z
      .string({
        message: "El identificador del asesor debe ser una cadena de texto.",
      })
      .default(""),
  })
  .refine(
    (data) => {
      if (data.channel === CustomerChannel.ASSISTED) {
        return !!data.advisorId && data.advisorId.trim() !== "";
      }
      return true;
    },
    {
      message:
        "El código de identificación del asesor es obligatorio para el canal asistido.",
      path: ["advisorId"],
    },
  );

export type selectChannelDto = z.infer<typeof selectChannelSchema>;

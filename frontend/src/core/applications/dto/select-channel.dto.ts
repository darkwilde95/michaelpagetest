import { z } from "zod";
import { CustomerChannel } from "../types";

export const selectChannelSchema = z
  .object({
    channel: z.enum(CustomerChannel),
    advisorId: z.string(),
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

export type selectChannelDto = z.infer<typeof selectChannelSchema>;

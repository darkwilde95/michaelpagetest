"use client";

import { selectChannelSchema } from "@/core/applications/dto/select-channel.dto";
import { CustomerChannel, IApplication } from "@/core/applications/types";
import { formatValidationErrors } from "@/core/utils/formatValidationErrors";
import {
  ChangeEventHandler,
  Dispatch,
  RefObject,
  SetStateAction,
  SubmitEventHandler,
  useState,
} from "react";

interface ChannelSelectionStepProps {
  applicationCurrentData: RefObject<Partial<IApplication>>;
  nextStep: () => void;
  setErrors: Dispatch<SetStateAction<Record<string, string> | null>>;
}

export function ChannelSelectionStep({
  applicationCurrentData,
  nextStep,
  setErrors,
}: ChannelSelectionStepProps) {
  const [channel, setChannel] = useState<CustomerChannel>(
    CustomerChannel.SELF_MANAGED,
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setChannel(value as CustomerChannel);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const advisorId = formData.get("advisorId") as string;
    const result = selectChannelSchema.safeParse({
      advisorId: advisorId ?? "",
      channel,
    });
    if (!result.success) {
      setErrors(formatValidationErrors(result));
    } else {
      setErrors(null);
      applicationCurrentData.current = {
        ...applicationCurrentData.current,
        channel,
        advisorId: advisorId ?? "",
      };
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Selección de Canal de Atención
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <label
          className={`p-4 border rounded-xl flex flex-col cursor-pointer transition-all ${channel === CustomerChannel.SELF_MANAGED ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-gray-200"}`}
        >
          <input
            type="radio"
            name="channel"
            value={CustomerChannel.SELF_MANAGED}
            checked={channel === CustomerChannel.SELF_MANAGED}
            onChange={handleChange}
            className="sr-only"
          />
          <span className="font-bold text-gray-700">Autogestionado</span>
          <span className="text-xs text-gray-500 mt-1">
            Realiza el proceso de forma digital y autónoma.
          </span>
        </label>

        <label
          className={`p-4 border rounded-xl flex flex-col cursor-pointer transition-all ${channel === CustomerChannel.ASSISTED ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-gray-200"}`}
        >
          <input
            type="radio"
            name="channel"
            value={CustomerChannel.ASSISTED}
            checked={channel === CustomerChannel.ASSISTED}
            onChange={handleChange}
            className="sr-only"
          />
          <span className="font-bold text-gray-700">Asistido (Asesor)</span>
          <span className="text-xs text-gray-500 mt-1">
            Proceso gestionado a través de un asesor del banco.
          </span>
        </label>
      </div>

      {channel === CustomerChannel.ASSISTED && (
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-gray-600">
            Código o ID del Asesor *
          </label>
          <input
            type="text"
            name="advisorId"
            className="p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            placeholder="Ej: ASE-8839"
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm"
      >
        Iniciar Solicitud
      </button>
    </form>
  );
}

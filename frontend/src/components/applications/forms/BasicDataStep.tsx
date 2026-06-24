"use client";

import {
  CustomerChannel,
  DocumentType,
  IApplication,
} from "@/core/applications/types";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
} from "react";
import { SubmitButton } from "./SubmitButton";
import {
  CreateApplicationDto,
  createApplicationSchema,
} from "@/core/applications/dto/create-application.dto";
import { formatValidationErrors } from "@/core/utils/formatValidationErrors";
import { createApplicationAction } from "@/actions/applications.action";
import { useApplicationError } from "@/hooks/useApplicationError";

interface BasicDataStepProps {
  applicationCurrentData: RefObject<Partial<IApplication>>;
  setErrors: Dispatch<SetStateAction<Record<string, string> | null>>;
  nextStep: () => void;
}

export function BasicDataStep({
  applicationCurrentData,
  nextStep,
  setErrors,
}: BasicDataStepProps) {
  const { captureAndRedirect } = useApplicationError();
  const clientAction = async (formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      ...applicationCurrentData.current,
      ...rawData,
    };

    const result = createApplicationSchema.safeParse(data);

    if (!result.success) {
      setErrors(formatValidationErrors(result));
    } else {
      setErrors(null);
      try {
        const response = await createApplicationAction(
          data as CreateApplicationDto,
        );
        if (response && response.success) {
          applicationCurrentData.current = {
            ...applicationCurrentData.current,
            ...response.data,
          };
          nextStep();
        } else {
          captureAndRedirect(response);
        }
      } catch (error) {
        captureAndRedirect(error);
      }
    }
  };

  return (
    <form action={clientAction} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        Información Básica del Solicitante
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            Tipo de Documento
          </label>
          <select
            name="documentType"
            className="p-3 border border-gray-300 rounded-lg text-sm bg-white"
          >
            {Object.values(DocumentType).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            Número de Documento
          </label>
          <input
            type="text"
            name="documentNumber"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-xs font-semibold text-gray-600">
          Nombre Completo
        </label>
        <input
          type="text"
          name="fullName"
          required
          className="p-3 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">Celular</label>
          <input
            type="tel"
            name="phoneNumber"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-xs font-semibold text-gray-600">
          Ciudad de Residencia
        </label>
        <input
          type="text"
          name="city"
          required
          className="p-3 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <SubmitButton
        pendingText="Procesando..."
        actionText="Continuar al Paso Financiero"
      />
    </form>
  );
}

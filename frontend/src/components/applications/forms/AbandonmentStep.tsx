"use client";

import { abandonCreditAction } from "@/actions/applications.action";
import { abandonApplicationSchema } from "@/core/applications/dto/abandonment-application.dto";
import { ApplicationStatus, IApplication } from "@/core/applications/types";
import { formatValidationErrors } from "@/core/utils/formatValidationErrors";
import { useRouter } from "next/navigation";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { SubmitButton } from "./SubmitButton";

interface AbandonmentStepProps {
  applicationCurrentData: RefObject<Partial<IApplication>>;
  setErrors: Dispatch<SetStateAction<Record<string, string> | null>>;
  goBackFlow: () => void;
}

const ABANDONMENT_APPROVED_REASONS = [
  "La tasa de interés es muy alta",
  "El monto pre-aprobado no cubre mi necesidad",
  "El plazo disponible no se acomoda a mi flujo de caja",
  "Trámite muy demorado / Solicité en otra entidad",
  "Inconsistencia en mis datos financieros",
  "No deseo continuar con el proceso por motivos personales",
];

const ABANDONMENT_PREAPPROVED_REASONS = [
  "Solicité en otra entidad",
  "No deseo continuar con el proceso por motivos personales",
];

export function AbandonmentStep({
  setErrors,
  goBackFlow,
  applicationCurrentData,
}: AbandonmentStepProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const router = useRouter();
  const isPostApproval =
    applicationCurrentData.current.status === ApplicationStatus.VIABLE;
  const abandonmentAction = async () => {
    const data = {
      abandonmentReason: selectedReason,
    };
    const result = abandonApplicationSchema.safeParse(data);
    if (result.success) {
      setErrors(null);
      await abandonCreditAction(applicationCurrentData.current.id!, data);
      router.push(`/applications`);
    } else {
      setErrors(formatValidationErrors(result));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-6 animate-fade-in">
      <div className="w-14 h-14 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-xl font-black text-gray-950 tracking-tight">
          {isPostApproval
            ? "Rechazar Oferta Comercial"
            : "¿Deseas desistir de la solicitud?"}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          {isPostApproval
            ? "Lamentamos que la oferta simulada no cumpla tus expectativas. Ayúdanos a mejorar indicando el motivo principal:"
            : "Si abandonas ahora, guardaremos tu progreso como borrador para que puedas retomarlo después desde la mesa de control."}
        </p>
      </div>

      <form action={abandonmentAction} className="space-y-4">
        <div>
          <label
            htmlFor="reason"
            className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2"
          >
            Motivo de la decisión *
          </label>
          <select
            id="reason"
            required
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          >
            <option value="">-- Selecciona una opción --</option>
            {(isPostApproval
              ? ABANDONMENT_APPROVED_REASONS
              : ABANDONMENT_PREAPPROVED_REASONS
            ).map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <SubmitButton
            disabled={!selectedReason}
            actionText={
              isPostApproval ? "Confirmar Rechazo" : "Confirmar Abandono"
            }
            pendingText="Procesando..."
            className="w-full sm:w-1/2 order-2 sm:order-1 px-4 py-2.5 bg-gray-950 text-white text-xs font-bold rounded-xl hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 transition-colors cursor-pointer"
          />
          <button
            type="button"
            onClick={goBackFlow}
            className="w-full sm:w-1/2 order-1 sm:order-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Regresar al Flujo
          </button>
        </div>
      </form>
    </div>
  );
}

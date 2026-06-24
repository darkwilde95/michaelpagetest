"use client";

import { ApplicationService } from "@/core/applications/service";
import { ApplicationStatus, IApplication } from "@/core/applications/types";
import { RefObject, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  finalizeCreditAction,
  simulateOfferAction,
} from "@/actions/applications.action";
import { useApplicationError } from "@/hooks/useApplicationError";

interface SimulationResultStepProps {
  applicationCurrentData: RefObject<Partial<IApplication>>;
  abandonmentStep: () => void;
}

export function SimulationResultStep({
  applicationCurrentData,
  abandonmentStep,
}: SimulationResultStepProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);
  const { captureAndRedirect } = useApplicationError();

  const simulateAction = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await simulateOfferAction(id);

      if (response && response.success) {
        applicationCurrentData.current = {
          ...applicationCurrentData.current,
          ...response.data,
        };
        setIsLoading(false);
      } else {
        captureAndRedirect(response);
      }
    } catch (error) {
      captureAndRedirect(error);
    }
  };

  const finalizeAction = async () => {
    setIsLoadingAction(true);
    try {
      const response = await finalizeCreditAction(
        applicationCurrentData.current.id!,
      );
      if (response && response.success) {
        setIsLoadingAction(false);
        router.push(
          `/applications/${applicationCurrentData.current.id}/success`,
        );
      } else {
        captureAndRedirect(response);
      }
    } catch (error) {
      captureAndRedirect(error);
    }
  };

  useEffect(() => {
    if (applicationCurrentData.current.status === ApplicationStatus.DRAFT) {
      simulateAction(applicationCurrentData.current.id!);
    } else setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        <p className="text-sm text-gray-600 font-medium">
          Cargando tu información
        </p>
        <p className="text-xs text-gray-400">
          Este proceso puede tomar algunos segundos
        </p>
      </div>
    );

  if (applicationCurrentData.current.status === ApplicationStatus.NOT_VIABLE) {
    return (
      <div className="p-6 bg-red-50 rounded-xl border border-red-200 text-center space-y-4">
        <div className="text-3xl">❌</div>
        <h3 className="text-lg font-bold text-red-800">Solicitud No Viable</h3>
        <p className="text-sm text-red-700 max-w-md mx-auto leading-relaxed">
          {applicationCurrentData.current.loanStatusMessage}
        </p>
        <p className="text-xs text-gray-500">
          Puedes intentar una nueva solicitud en 30 días con una distribución de
          egresos diferente o un menor monto solicitado.
        </p>
        <button
          onClick={() => router.push("/applications")}
          className="w-full py-2.5 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-900 transition-colors"
        >
          Salir del Proceso
        </button>
      </div>
    );
  }

  if (applicationCurrentData.current.status === ApplicationStatus.VIABLE) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center space-y-2">
          <div className="text-3xl">🎉</div>
          <h3 className="text-lg font-bold text-green-800">
            ¡Tu Crédito Pre-Aprobado es Viable!
          </h3>
          <p className="text-xs text-green-700 font-medium">
            Hemos calculado una oferta comercial adaptada a tus ingresos.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-4 shadow-inner">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Resumen de la Oferta
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Monto Aprobado</p>
              <p className="text-xl font-black text-gray-800">
                $
                {applicationCurrentData.current.requestedAmount!.toLocaleString(
                  "es-CO",
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cuota Mensual Estimada</p>
              <p className="text-xl font-black text-blue-600">
                $
                {applicationCurrentData.current.monthlyPayment!.toLocaleString(
                  "es-CO",
                )}{" "}
                / mes
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Plazo Asignado</p>
              <p className="text-sm font-bold text-gray-700">
                {applicationCurrentData.current.desiredTerm!} Meses
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tasa de Interés (E.A.)</p>
              <p className="text-sm font-bold text-gray-700">
                {applicationCurrentData.current.interestRateEA!}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => abandonmentStep()}
            disabled={isLoadingAction}
            className="w-1/3 py-3 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 text-sm transition-colors"
          >
            Rechazar Oferta
          </button>
          <button
            onClick={() => finalizeAction()}
            disabled={isLoadingAction}
            className="w-2/3 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm transition-colors shadow-sm"
          >
            {isLoadingAction ? "Confirmando..." : "Aceptar y Finalizar Crédito"}
          </button>
        </div>
      </div>
    );
  }

  return null;
}

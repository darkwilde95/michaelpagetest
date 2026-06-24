"use client";

import { useRef, useState } from "react";
import { ApplicationStatus, IApplication } from "@/core/applications/types";

import { ChannelSelectionStep } from "./forms/ChannelSelectionStep";
import { BasicDataStep } from "./forms/BasicDataStep";
import { FinancialDataStep } from "./forms/FinancialDataStep";
import { SimulationResultStep } from "./forms/SimulationResultStep";
import { AbandonmentStep } from "./forms/AbandonmentStep";

enum WizardStep {
  CHANNEL_SELECTION = 1,
  BASIC_DATA = 2,
  FINANCIAL_DATA = 3,
  SIMULATION_RESULT = 4,
  ABANDONMENT = 5,
}

interface WizardContainerProps {
  savedData?: IApplication;
}

export function ApplicationWizardContainer({
  savedData,
}: WizardContainerProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(() => {
    if (savedData) {
      if (savedData.status === ApplicationStatus.DRAFT)
        return WizardStep.FINANCIAL_DATA;
      if (savedData.status === ApplicationStatus.VIABLE)
        return WizardStep.SIMULATION_RESULT;
    }
    return WizardStep.CHANNEL_SELECTION;
  });
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const applicationCurrentData = useRef<Partial<IApplication>>(savedData ?? {});
  const advisorId = applicationCurrentData.current?.advisorId;

  return (
    <>
      {/* Indicador visual del Canal Asistido / Código de Asesor */}
      {advisorId && (
        <div
          className="flex justify-end mb-4 animate-fade-in"
          role="status"
          aria-live="polite"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>
              Canal Asistido | Asesor:{" "}
              <strong className="text-gray-950 font-bold">{advisorId}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Barra de progreso */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 text-sm font-medium text-gray-400 gap-8">
        <span
          className={
            currentStep >= WizardStep.CHANNEL_SELECTION
              ? "text-blue-600 font-semibold"
              : ""
          }
        >
          1. Canal
        </span>
        <span
          className={
            currentStep >= WizardStep.BASIC_DATA
              ? "text-blue-600 font-semibold"
              : ""
          }
        >
          2. Datos Básicos
        </span>
        <span
          className={
            currentStep >= WizardStep.FINANCIAL_DATA
              ? "text-blue-600 font-semibold"
              : ""
          }
        >
          3. Financiero
        </span>
        <span
          className={
            currentStep >= WizardStep.SIMULATION_RESULT
              ? "text-blue-600 font-semibold"
              : ""
          }
        >
          4. Resultado
        </span>
      </div>

      {errors && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm font-medium">
          {Object.entries(errors).map((entry) => (
            <span key={entry[0]}>{entry[1]}</span>
          ))}
        </div>
      )}

      {currentStep === WizardStep.CHANNEL_SELECTION && (
        <ChannelSelectionStep
          applicationCurrentData={applicationCurrentData}
          nextStep={() => setCurrentStep(WizardStep.BASIC_DATA)}
          setErrors={setErrors}
        />
      )}

      {currentStep === WizardStep.BASIC_DATA && (
        <BasicDataStep
          applicationCurrentData={applicationCurrentData}
          setErrors={setErrors}
          nextStep={() => setCurrentStep(WizardStep.FINANCIAL_DATA)}
        />
      )}

      {currentStep === WizardStep.FINANCIAL_DATA && (
        <FinancialDataStep
          applicationCurrentData={applicationCurrentData}
          setErrors={setErrors}
          nextStep={() => setCurrentStep(WizardStep.SIMULATION_RESULT)}
          abandonmentStep={() => setCurrentStep(WizardStep.ABANDONMENT)}
        />
      )}

      {currentStep === WizardStep.SIMULATION_RESULT && (
        <SimulationResultStep
          applicationCurrentData={applicationCurrentData}
          abandonmentStep={() => setCurrentStep(WizardStep.ABANDONMENT)}
        />
      )}

      {currentStep === WizardStep.ABANDONMENT && (
        <AbandonmentStep
          setErrors={setErrors}
          applicationCurrentData={applicationCurrentData}
          goBackFlow={() =>
            setCurrentStep(
              applicationCurrentData.current.status === ApplicationStatus.VIABLE
                ? WizardStep.SIMULATION_RESULT
                : WizardStep.FINANCIAL_DATA,
            )
          }
        />
      )}
    </>
  );
}

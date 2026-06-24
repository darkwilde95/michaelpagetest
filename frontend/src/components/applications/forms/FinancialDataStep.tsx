"use client";

import {
  UpdateApplicationDto,
  updateApplicationSchema,
} from "@/core/applications/dto/update-application.dto";
import { formatValidationErrors } from "@/core/utils/formatValidationErrors";
import {
  ChangeEventHandler,
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./SubmitButton";
import {
  abandonCreditAction,
  updateApplicationAction,
} from "@/actions/applications.action";
import { IApplication } from "@/core/applications/types";

interface FinancialDataStepProps {
  applicationCurrentData: RefObject<Partial<IApplication>>;
  setErrors: Dispatch<SetStateAction<Record<string, string> | null>>;
  nextStep: () => void;
  abandonmentStep: () => void;
}

export function FinancialDataStep({
  applicationCurrentData,
  setErrors,
  nextStep,
  abandonmentStep,
}: FinancialDataStepProps) {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [income, setIncome] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [requestedAmount, setRequestedAmount] = useState<string>("");
  const [desiredTerm, setDesiredTerm] = useState<string>("12");
  const [loanPurpose, setLoanPurpose] = useState<string>("");

  useEffect(() => {
    setIncome(
      applicationCurrentData.current.income
        ? String(applicationCurrentData.current.income)
        : "",
    );
    setExpenses(
      applicationCurrentData.current.expenses
        ? String(applicationCurrentData.current.expenses)
        : "",
    );
    setRequestedAmount(
      applicationCurrentData.current.requestedAmount
        ? String(applicationCurrentData.current.requestedAmount)
        : "",
    );
    setDesiredTerm(
      applicationCurrentData.current.desiredTerm
        ? String(applicationCurrentData.current.desiredTerm)
        : "12",
    );
    setLoanPurpose(
      applicationCurrentData.current.loanPurpose
        ? String(applicationCurrentData.current.loanPurpose)
        : "",
    );
  }, []);

  const validateAndSaveDraft = async () => {
    const data = {
      income: income ? Number(income) : 0,
      expenses: expenses ? Number(expenses) : 0,
      requestedAmount: requestedAmount ? Number(requestedAmount) : 0,
      desiredTerm: desiredTerm ? Number(desiredTerm) : 12,
      loanPurpose,
    } as UpdateApplicationDto;
    const result = updateApplicationSchema.safeParse(data);

    if (!result.success) {
      setErrors(formatValidationErrors(result));
    } else {
      setErrors(null);
      await updateApplicationAction(applicationCurrentData.current.id!, data!);
      applicationCurrentData.current = {
        ...applicationCurrentData.current,
        ...data,
      };
    }
  };

  const saveDraftAction = async () => {
    await validateAndSaveDraft();
    router.push("/applications");
  };

  const reqViabilityAction = async () => {
    await validateAndSaveDraft();
    nextStep();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <form className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          Información Financiera y del Cupo
        </h2>
        <SubmitButton
          actionText="💾 Guardar Borrador"
          pendingText="Guardando..."
          formAction={saveDraftAction}
          className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            Ingresos Mensuales ($) *
          </label>
          <input
            type="number"
            name="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            min="0"
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            Egresos Mensuales ($) *
          </label>
          <input
            type="number"
            name="expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            min="0"
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            Monto del Crédito Solicitado ($) *
          </label>
          <input
            type="number"
            name="requestedAmount"
            value={requestedAmount}
            onChange={(e) => setRequestedAmount(e.target.value)}
            min="1"
            className="p-3 border border-gray-300 rounded-lg text-sm font-bold text-blue-900"
            placeholder="Ej: 5000000"
          />
          <p className="text-[10px] text-gray-400">
            Prueba monto 999999 para simular error técnico.
          </p>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            Plazo Deseado (Meses) *
          </label>
          <select
            name="desiredTerm"
            value={desiredTerm}
            onChange={(e) => setDesiredTerm(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="12">12 Meses</option>
            <option value="24">24 Meses</option>
            <option value="36">36 Meses</option>
            <option value="48">48 Meses</option>
            <option value="60">60 Meses</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-xs font-semibold text-gray-600">
          Destino del Crédito
        </label>
        <textarea
          name="loanPurpose"
          value={loanPurpose}
          onChange={(e) => setLoanPurpose(e.target.value)}
          rows={2}
          className="p-3 border border-gray-300 rounded-lg text-sm resize-none"
          placeholder="Ej: Remodelación de vivienda, viajes, estudios..."
        />
      </div>

      <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer">
        <input
          type="checkbox"
          name="dataProcessingAccepted"
          checked={termsAccepted}
          onChange={handleChange}
          className="mt-1 rounded text-blue-600 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-600 leading-normal">
          Acepto los términos y condiciones de tratamiento y validación de datos
          personales con fines de evaluación de riesgo crediticio.
        </span>
      </label>

      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={abandonmentStep}
          className="w-1/3 py-3 border border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 text-sm transition-colors"
        >
          Desistir Proceso
        </button>
        <SubmitButton
          actionText="Solicitar Viabilidad Financiera"
          pendingText="Analizando Perfil..."
          formAction={reqViabilityAction}
          disabled={!termsAccepted}
          className="w-2/3 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm shadow-sm"
        />
      </div>
    </form>
  );
}

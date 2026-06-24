"use client";

import { useRouter } from "next/navigation";

export function useApplicationError() {
  const router = useRouter();

  const captureAndRedirect = (
    errorResponse: { error?: string; code?: string } | any,
  ) => {
    const message =
      errorResponse?.error ||
      "Ocurrió un error inesperado en el Core Financiero.";
    const code = errorResponse?.code || "ERR_HTTP_500_UNHANDLED";

    const queryParams = new URLSearchParams({
      message,
      code,
    });

    router.push(`/applications/error?${queryParams.toString()}`);
  };

  return { captureAndRedirect };
}

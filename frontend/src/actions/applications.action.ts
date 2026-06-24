"use server";

import { ApplicationService } from "@/core/applications/service";
import { ApiError } from "@/core/api/api-client";
import {
  CustomerChannel,
  DocumentType,
  IApplication,
  ISimulationResponse,
} from "@/core/applications/types";
import { ServerActionResponse } from "@/core/api/types";
import { CreateApplicationDto } from "@/core/applications/dto/create-application.dto";
import { UpdateApplicationDto } from "@/core/applications/dto/update-application.dto";

/**
 * Paso 2: Crear la solicitud inicial de crédito
 */
export async function createApplicationAction(
  data: CreateApplicationDto,
): Promise<ServerActionResponse<IApplication>> {
  try {
    const result = await ApplicationService.create(data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error en createApplicationAction:", error);
    if (error instanceof ApiError) {
      return { success: false, error: error.message, status: error.status };
    }
    return {
      success: false,
      error: "Error interno en el servidor al crear la solicitud.",
    };
  }
}

/**
 * Paso 3: Guardar borrador o actualizar datos financieros
 */
export async function updateApplicationAction(
  id: string,
  data: UpdateApplicationDto,
): Promise<ServerActionResponse<IApplication>> {
  try {
    const result = await ApplicationService.update(id, data);
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error en updateApplicationAction para ID ${id}:`, error);
    if (error instanceof ApiError) {
      return { success: false, error: error.message, status: error.status };
    }
    return {
      success: false,
      error: "Error al actualizar los datos en el servidor.",
    };
  }
}

/**
 * Paso 3 -> 4: Disparar el motor de análisis y simulación de oferta
 */
export async function simulateOfferAction(
  id: string,
): Promise<ServerActionResponse<ISimulationResponse>> {
  try {
    const result = await ApplicationService.simulateOffer(id);
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error en simulateOfferAction para ID ${id}:`, error);
    if (error instanceof ApiError) {
      // Devolvemos el status (ej. 500) para que el cliente ejecute la mitigación por alta latencia
      return { success: false, error: error.message, status: error.status };
    }
    return {
      success: false,
      error: "Error de comunicación con el motor de riesgo.",
    };
  }
}

/**
 * Paso 4: Finalizar y confirmar el crédito
 */
export async function finalizeCreditAction(
  id: string,
): Promise<ServerActionResponse<IApplication>> {
  try {
    const result = await ApplicationService.finalize(id);
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error en finalizeCreditAction para ID ${id}:`, error);
    if (error instanceof ApiError) {
      return { success: false, error: error.message, status: error.status };
    }
    return {
      success: false,
      error: "No se pudo confirmar el crédito en los sistemas centrales.",
    };
  }
}

/**
 * Flujo alterno: Registrar desistimiento / abandono del proceso
 */
export async function abandonCreditAction(
  id: string,
  data: { abandonmentReason: string },
): Promise<ServerActionResponse<IApplication>> {
  try {
    const result = await ApplicationService.abandon(id, data);
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error en abandonCreditAction para ID ${id}:`, error);
    if (error instanceof ApiError) {
      return { success: false, error: error.message, status: error.status };
    }
    return { success: false, error: "Error al procesar el desistimiento." };
  }
}

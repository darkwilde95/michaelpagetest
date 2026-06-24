import { apiClient } from "../api/api-client";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { IApplication, IApplicationEvent } from "./types";

export const ApplicationService = {
  /** POST /applications - Crear solicitud inicial */
  async create(data: CreateApplicationDto): Promise<IApplication> {
    return apiClient.post<IApplication>("/applications", data);
  },

  /** GET /applications - Listar solicitudes con filtros */
  async findAll(
    filters: { status?: string; channel?: string; search?: string } = {},
  ): Promise<IApplication[]> {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.channel) queryParams.append("channel", filters.channel);
    if (filters.search) queryParams.append("search", filters.search);

    return apiClient.get<IApplication[]>(
      `/applications?${queryParams.toString()}`,
      {
        cache: "no-store",
      },
    );
  },

  /** GET /applications/{id} - Consultar detalle */
  async findOne(id: string): Promise<IApplication> {
    return apiClient.get<IApplication>(`/applications/${id}`, {
      cache: "no-store",
    });
  },

  /** PATCH /applications/{id} - Actualizar datos / Guardar borrador */
  async update(id: string, data: Partial<IApplication>): Promise<IApplication> {
    return apiClient.patch<IApplication>(`/applications/${id}`, data);
  },

  /** POST /applications/{id}/simulate-offer - Obtener simulación preliminar */
  async simulateOffer(id: string): Promise<IApplication> {
    return apiClient.post<IApplication>(`/applications/${id}/simulate-offer`);
  },

  /** POST /applications/{id}/finalize - Finalizar la solicitud */
  async finalize(id: string): Promise<IApplication> {
    return apiClient.post<IApplication>(`/applications/${id}/finalize`);
  },

  /** POST /applications/{id}/abandon - Desistir o abandonar la solicitud */
  async abandon(
    id: string,
    data: { abandonmentReason: string },
  ): Promise<IApplication> {
    return apiClient.post<IApplication>(`/applications/${id}/abandon`, data);
  },

  /** GET /applications/{id}/events - Consultar trazabilidad de eventos */
  async getEvents(id: string): Promise<IApplicationEvent[]> {
    return apiClient.get<IApplicationEvent[]>(`/applications/${id}/events`, {
      cache: "no-store",
    });
  },
};

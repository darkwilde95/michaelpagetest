export enum ApplicationAction {
  CREATED = 'Creación de la solicitud',
  DATA_UPDATED = 'Actualización de datos',
  SIMULATION_SUCCESS = 'Simulación aprobada (Viable)',
  SIMULATION_REJECTED = 'Simulación rechazada (No Viable)',
  FINALIZED = 'Solicitud finalizada con éxito',
  ABANDONED = 'Solicitud desistida / Abandonada',
}

export interface IApplicationEvent {
  id: string;
  applicationId: string;
  action: ApplicationAction;
  previousStatus: string;
  currentStatus: string;
  notes?: string;
  timestamp: Date;
}

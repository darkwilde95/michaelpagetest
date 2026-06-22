export enum ApplicationStatus {
  DRAFT = 'Borrador',
  PENDING_VALIDATION = 'Pendiente Validacion',
  VIABLE = 'Viable',
  NOT_VIABLE = 'No Viable',
  FINALIZED = 'Finalizada',
  ABANDONED = 'Abandonada',
}

export enum CustomerChannel {
  SELF_MANAGED = 'Autogestionado',
  ASSISTED = 'Asistido',
}

export enum DocumentType {
  CC = 'Cedula de Ciudadania',
  CE = 'Cedula de Extranjeria',
  TI = 'Tarjeta de Identidad',
  PAS = 'Pasaporte',
}

export interface IApplication {
  id: string;
  channel: CustomerChannel;
  advisorId?: string;
  status: ApplicationStatus;
  abandonmentReason?: string;

  // Basic Data
  documentType?: DocumentType;
  documentNumber?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  city?: string;

  // Complementary Data
  income?: number;
  expenses?: number;
  requestedAmount?: number;
  desiredTerm?: number;
  loanPurpose?: string;
  dataProcessingAccepted?: boolean;

  createdAt: number;
  updatedAt: number;
}

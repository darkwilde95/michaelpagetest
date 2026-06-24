export enum ApplicationStatus {
  DRAFT = "Borrador",
  PENDING_VALIDATION = "Pendiente Validacion",
  VIABLE = "Viable",
  NOT_VIABLE = "No Viable",
  FINALIZED = "Finalizada",
  ABANDONED = "Abandonada",
}

export enum CustomerChannel {
  SELF_MANAGED = "Autogestionado",
  ASSISTED = "Asistido",
}

export enum DocumentType {
  CC = "Cedula de Ciudadania",
  CE = "Cedula de Extranjeria",
  TI = "Tarjeta de Identidad",
  PAS = "Pasaporte",
}

export interface IApplication {
  id: string;
  channel: CustomerChannel;
  advisorId?: string;

  // Basic Data
  documentType: DocumentType;
  documentNumber: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;

  // Complementary Data
  status: ApplicationStatus;
  income?: number;
  expenses?: number;
  abandonmentReason?: string;
  loanPurpose?: string;
  requestedAmount?: number;
  interestRateEA?: number;
  monthlyPayment?: number;
  desiredTerm?: number;
  loanStatusMessage?: string;

  createdAt: number;
  updatedAt: number;
}

export interface IApplicationEvent {
  id: string;
  applicationId: string;
  action: string;
  previousStatus: string;
  currentStatus: string;
  notes?: string;
  timestamp: string;
}

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  PENDING_VALIDATION = 'PENDING_VALIDATION',
  FINALIZED = 'FINALIZED',
  ABANDONED = 'ABANDONED',
}

export enum ApplicationEventType {
  CREACION = 'CREACION_SOLICITUD',
  ACTUALIZACION = 'ACTUALIZACION_DATOS',
  SIMULACION = 'SIMULACION_OFERTA',
  FINALIZACION = 'FINALIZACION_PROCESO',
  ABANDONO = 'ABANDONO_PROCESO',
}

export enum Channel {
  SELF_MANAGED = 'AUTOGESTIONADO',
  ASSISTED = 'ASISTIDO',
}

export enum ApplicationStep {
  INITIAL = 'INITIAL',
  FINANCIAL = 'FINANCIAL',
  SIMULATION = 'SIMULATION',
  SUMMARY = 'SUMMARY',
  FINALIZED = 'FINALIZED',
}

export interface ApplicationEvent {
  id: string;
  applicationId: string;
  type: ApplicationEventType;
  description: string;
  timestamp: Date;
}

export enum DocumentType {
  CC = 'CC',
  CE = 'CE',
  PAS = 'PAS',
  PPT = 'PPT',
}

export interface Application {
  id: string;
  status: ApplicationStatus;
  channel: Channel;
  lastStepCompleted: ApplicationStep;
  advisorId?: string; // Requerido si el canal es asistido

  // Datos Básicos
  documentType: DocumentType;
  documentNumber: string;
  names: string;
  cellphone: string;
  email: string;
  city: string;

  // Datos Complementarios
  income?: number;
  expenses?: number;
  requestedAmount?: number;
  desiredTerm?: number; // en meses
  creditPurpose?: string;
  dataTreatmentAccepted?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface SimulationResponse {
  status: 'APROBADO_PRELIMINAR' | 'RECHAZADO';
  approvedAmount?: number;
  approvedTerm?: number;
  monthlyEstimatedPayment?: number;
  interestRate?: string;
  code?: string;
  message?: string;
}

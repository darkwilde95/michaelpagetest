import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  IApplicationEvent,
  ApplicationAction,
} from './interfaces/event.interface';

@Injectable()
export class EventsService {
  // Almacenamiento temporal en memoria para cumplir la trazabilidad de la prueba
  private events: IApplicationEvent[] = [];

  /**
   * Registra un nuevo evento de auditoría en la línea de tiempo
   */
  createEvent(
    applicationId: string,
    action: ApplicationAction,
    previousStatus: string,
    currentStatus: string,
    notes?: string,
  ): IApplicationEvent {
    const newEvent: IApplicationEvent = {
      id: uuidv4(),
      applicationId,
      action,
      previousStatus,
      currentStatus,
      notes,
      timestamp: new Date(),
    };

    this.events.push(newEvent);
    return newEvent;
  }

  /**
   * Retorna el historial cronológico de una solicitud específica (Ordenado del más reciente al más antiguo)
   */
  getEventsByApplication(applicationId: string): IApplicationEvent[] {
    return this.events
      .filter((event) => event.applicationId === applicationId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

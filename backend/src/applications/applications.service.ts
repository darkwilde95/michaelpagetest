import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Application,
  ApplicationStatus,
  ApplicationEvent,
  Channel,
  ApplicationEventType,
  SimulationResponse,
  ApplicationStep,
} from './interfaces/application.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AbandonApplicationDto } from './dto/abandon-application.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApplicationsService {
  private applications: Application[] = [];
  private events: ApplicationEvent[] = [];

  // POST /applications
  create(createDto: CreateApplicationDto): Application {
    const newApplication: Application = {
      id: uuidv4(),
      status: ApplicationStatus.DRAFT,
      lastStepCompleted: ApplicationStep.INITIAL,
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.applications.push(newApplication);
    this.logEvent(
      newApplication.id,
      ApplicationEventType.CREACION,
      'Se inicializa la solicitud en estado borrador.',
    );
    return newApplication;
  }

  // GET /applications
  findAll(
    status?: ApplicationStatus,
    channel?: Channel,
    search?: string,
  ): Application[] {
    let result = this.applications;

    if (status) {
      result = result.filter((app) => app.status === status);
    }
    if (channel) {
      result = result.filter((app) => app.channel === channel);
    }
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (app) =>
          app.names.toLowerCase().includes(query) ||
          app.documentNumber.includes(query),
      );
    }
    return result;
  }

  // GET /applications/:id
  findOne(id: string): Application {
    const app = this.applications.find((a) => a.id === id);
    if (!app)
      throw new NotFoundException(`La solicitud con ID ${id} no existe.`);
    return app;
  }

  // PATCH /applications/:id
  update(id: string, updateDto: UpdateApplicationDto): Application {
    const application = this.findOne(id);

    if (
      application.status === ApplicationStatus.FINALIZED ||
      application.status === ApplicationStatus.ABANDONED
    ) {
      throw new BadRequestException(
        'No se puede modificar una solicitud finalizada o abandonada.',
      );
    }

    Object.assign(application, updateDto);
    application.updatedAt = new Date();

    this.logEvent(
      id,
      ApplicationEventType.ACTUALIZACION,
      'Se actualizaron los datos complementarios financieros.',
    );
    return application;
  }

  // POST /applications/:id/simulate-offer
  // Criterio Senior: Permitimos un query param opcional (?forceResult=...) para que el frontend pruebe fácilmente los 3 flujos requeridos.
  simulateOffer(
    id: string,
    forceResult?: 'success' | 'unviable' | 'error',
  ): SimulationResponse {
    this.findOne(id); // Valida que exista

    const mode =
      forceResult ||
      ['success', 'unviable', 'error'][Math.floor(Math.random() * 3)];

    this.logEvent(
      id,
      ApplicationEventType.SIMULACION,
      `Intento de simulación ejecutado. Resultado simulado: ${mode.toUpperCase()}`,
    );

    if (mode === 'unviable') {
      return {
        status: 'RECHAZADO',
        code: 'ERR_RISK_PROFILE',
        message:
          'La solicitud no es viable debido a que el nivel de endeudamiento supera los parámetros permitidos por la entidad.',
      };
    }

    if (mode === 'error') {
      throw new InternalServerErrorException({
        statusCode: 500,
        error: 'TechnicalError',
        message:
          'Error técnico temporal al conectarse con el sistema de score crediticio. Intente más tarde.',
      });
    }

    // Caso exitoso
    return {
      status: 'APROBADO_PRELIMINAR',
      approvedAmount: 15000000,
      approvedTerm: 36,
      monthlyEstimatedPayment: 480000,
      interestRate: '1.25% EM',
    };
  }

  // POST /applications/:id/finalize
  finalize(id: string): Application {
    const app = this.findOne(id);
    app.status = ApplicationStatus.FINALIZED;
    app.updatedAt = new Date();

    this.logEvent(
      id,
      ApplicationEventType.FINALIZACION,
      'El usuario aceptó los términos y radicó formalmente la solicitud.',
    );
    return app;
  }

  // POST /applications/:id/abandon
  abandon(id: string, abandonDto: AbandonApplicationDto): Application {
    const app = this.findOne(id);
    app.status = ApplicationStatus.ABANDONED;
    app.updatedAt = new Date();

    this.logEvent(
      id,
      ApplicationEventType.ABANDONO,
      `El proceso fue cancelado por el usuario. Motivo: ${abandonDto.reason}`,
    );
    return app;
  }

  // GET /applications/:id/events
  getEvents(applicationId: string): ApplicationEvent[] {
    this.findOne(applicationId); // Valida que exista la solicitud
    return this.events.filter((e) => e.applicationId === applicationId);
  }

  // Helper interno de trazabilidad
  private logEvent(
    applicationId: string,
    type: ApplicationEventType,
    description: string,
  ) {
    this.events.push({
      id: uuidv4(),
      applicationId,
      type,
      description,
      timestamp: new Date(),
    });
  }
}

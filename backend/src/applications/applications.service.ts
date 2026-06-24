import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  IApplication,
  ApplicationStatus,
} from './interfaces/application.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { FilterApplicationsDto } from './dto/filter-applications.dto';
import { AbandonApplicationDto } from './dto/abandon-application.dto';
import { ApplicationAction } from 'src/events/interfaces/event.interface';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class ApplicationsService {
  private applications: IApplication[] = [];

  constructor(private readonly eventsService: EventsService) {}

  create(createDto: CreateApplicationDto): IApplication {
    const newApplication: IApplication = {
      id: uuidv4(),
      ...createDto,
      income: 0,
      expenses: 0,
      desiredTerm: 0,
      loanPurpose: '',
      requestedAmount: 0,
      interestRateEA: 0,
      monthlyPayment: 0,
      abandonmentReason: '',
      status: ApplicationStatus.DRAFT,

      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.applications.push(newApplication);

    // AUDITORÍA: Registro de creación
    this.eventsService.createEvent(
      newApplication.id,
      ApplicationAction.CREATED,
      'Ninguno',
      newApplication.status,
    );

    return newApplication;
  }

  findAll(filters: FilterApplicationsDto): IApplication[] {
    let result = [...this.applications];
    const { status, channel, search } = filters;

    if (status) {
      result = result.filter((app) => app.status === status);
    }
    if (channel) {
      result = result.filter((app) => app.channel === channel);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      result = result
        .filter(
          (app) =>
            app.documentNumber?.includes(search) ||
            app.fullName?.toLowerCase().includes(searchLower),
        )
        .sort((a, b) => b.updatedAt - a.updatedAt);
    }

    return result;
  }

  findOne(id: string): IApplication {
    const application = this.applications.find((app) => app.id === id);
    if (!application) {
      throw new NotFoundException(`La solicitud con ID ${id} no existe.`);
    }
    return application;
  }

  update(id: string, updateDto: UpdateApplicationDto): IApplication {
    // 1. Buscamos la solicitud. Si no existe, findOne lanza un NotFoundException
    const application = this.findOne(id);
    const oldStatus = application.status;

    // 2. REGLA DE NEGOCIO: Bloqueo de edición por estado
    // Si la solicitud ya fue Finalizada o Abandonada, congelamos los datos.
    if (
      application.status === ApplicationStatus.FINALIZED ||
      application.status === ApplicationStatus.ABANDONED
    ) {
      throw new BadRequestException(
        `No es posible modificar la información. La solicitud se encuentra en estado: ${application.status}`,
      );
    }

    Object.assign(application, {
      ...application,
      ...updateDto,
      interestRateEA: 0,
      monthlyPayment: 0,
    });
    application.updatedAt = Date.now();

    // AUDITORÍA: Registro de actualización de datos
    this.eventsService.createEvent(
      application.id,
      ApplicationAction.DATA_UPDATED,
      oldStatus,
      application.status,
    );

    return application;
  }

  simulateOffer(id: string) {
    const application = this.findOne(id);
    const oldStatus = application.status;

    if (application.status !== ApplicationStatus.DRAFT) return application;

    console.log('INTENTANDO');
    if (!application.income || !application.requestedAmount) {
      throw new BadRequestException(
        'Faltan datos financieros (ingresos/monto) para realizar la simulación.',
      );
    }

    // ESCENARIO 1: ERROR TÉCNICO TEMPORAL (Monto gatillo: 999999)
    if (application.requestedAmount === 999999) {
      throw new InternalServerErrorException(
        'Error de conexión temporal con el nodo de validación financiera. Por favor, intente más tarde.',
      );
    }

    // ESCENARIO 2: RECHAZO / NO VIABLE
    const effectiveExpenses = application.expenses || 0;
    const availableCapacity = application.income - effectiveExpenses;

    if (availableCapacity < application.requestedAmount * 0.05) {
      application.status = ApplicationStatus.NOT_VIABLE;
      application.updatedAt = Date.now();
      application.loanStatusMessage =
        'La solicitud no es viable en este momento debido a que los egresos declarados comprometen la capacidad de pago requerida para el cupo solicitado.';

      // AUDITORÍA: Registro de rechazo financiero
      this.eventsService.createEvent(
        application.id,
        ApplicationAction.SIMULATION_REJECTED,
        oldStatus,
        application.status,
        'Capacidad de endeudamiento insuficiente según políticas de riesgo.',
      );

      return application;
    }

    // ESCENARIO 3: RESPUESTA EXITOSA (VIABLE)
    application.status = ApplicationStatus.VIABLE;
    application.updatedAt = Date.now();

    const monthlyRate = 0.018;
    const term = application.desiredTerm || 36;
    const monthlyPayment = Math.round(
      (application.requestedAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -term)),
    );

    // AUDITORÍA: Registro de simulación aprobada
    this.eventsService.createEvent(
      application.id,
      ApplicationAction.SIMULATION_SUCCESS,
      oldStatus,
      application.status,
      `Oferta generada por $${application.requestedAmount} a ${term} meses.`,
    );

    application.interestRateEA = 23.87;
    application.monthlyPayment = monthlyPayment;
    application.desiredTerm = term;
    return application;
  }

  finalize(id: string): IApplication {
    const application = this.findOne(id);
    const oldStatus = application.status;

    if (application.status !== ApplicationStatus.VIABLE) {
      throw new BadRequestException(
        'Solo se pueden finalizar solicitudes que cuenten con una simulación Viable.',
      );
    }

    application.status =
      application.advisorId && application.advisorId !== ''
        ? ApplicationStatus.FINALIZED
        : ApplicationStatus.PENDING_VALIDATION;
    application.updatedAt = Date.now();

    // AUDITORÍA: Registro de finalización del proceso
    this.eventsService.createEvent(
      application.id,
      ApplicationAction.FINALIZED,
      oldStatus,
      application.status,
    );

    return application;
  }

  abandon(id: string, abandonDto: AbandonApplicationDto): IApplication {
    const application = this.findOne(id);
    const oldStatus = application.status;

    if (application.status === ApplicationStatus.FINALIZED) {
      throw new BadRequestException(
        'No se puede abandonar una solicitud que ya se encuentra Finalizada.',
      );
    }

    application.status = ApplicationStatus.ABANDONED;
    application.abandonmentReason = abandonDto.abandonmentReason;
    application.updatedAt = Date.now();

    // AUDITORÍA: Registro de desistimiento con su respectiva nota explicativa
    this.eventsService.createEvent(
      application.id,
      ApplicationAction.ABANDONED,
      oldStatus,
      application.status,
      `Motivo de abandono: ${abandonDto.abandonmentReason}`,
    );

    return application;
  }

  getTimeline(id: string) {
    this.findOne(id);
    return this.eventsService.getEventsByApplication(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { FilterApplicationsDto } from './dto/filter-applications.dto';
import { AbandonApplicationDto } from './dto/abandon-application.dto';
import { type IApplication } from './interfaces/application.interface';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  /**
   * Paso 1: Inicializa la solicitud capturando los datos básicos del cliente.
   * Por defecto, la crea en estado 'Borrador'.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateApplicationDto): IApplication {
    return this.applicationsService.create(createDto);
  }

  /**
   * Vista Administrativa / Mesa de Control: Lista las solicitudes del banco
   * aplicando filtros opcionales de estado, canal o búsqueda por texto.
   */
  @Get()
  findAll(@Query() filters: FilterApplicationsDto): IApplication[] {
    return this.applicationsService.findAll(filters);
  }

  /**
   * Consulta detallada: Retorna la información completa de una solicitud específica.
   * Implementa validación estricta de UUID en el parámetro.
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): IApplication {
    return this.applicationsService.findOne(id);
  }

  /**
   * Guardado parcial (Borrador) / Paso 2: Actualiza datos básicos o complementarios
   * y financieros, siempre y cuando el estado transaccional actual lo permita.
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateApplicationDto,
  ): IApplication {
    return this.applicationsService.update(id, updateDto);
  }

  /**
   * Motor de Riesgo Simulado: Ejecuta la evaluación financiera basándose en la data.
   * Transiciona el estado a 'Viable' o 'No Viable', o dispara un error técnico temporal.
   */
  @Post(':id/simulate-offer')
  @HttpCode(HttpStatus.OK)
  simulate(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationsService.simulateOffer(id);
  }

  /**
   * Confirmación final: Cierra exitosamente el proceso de originación digital
   * transicionando el estado a 'Finalizada'.
   */
  @Post(':id/finalize')
  @HttpCode(HttpStatus.OK)
  finalize(@Param('id', ParseUUIDPipe) id: string): IApplication {
    return this.applicationsService.finalize(id);
  }

  /**
   * Flujo de Desistimiento: Permite al usuario o asesor cancelar el proceso
   * registrando de forma obligatoria el motivo del desinterés.
   */
  @Post(':id/abandon')
  @HttpCode(HttpStatus.OK)
  abandon(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() abandonDto: AbandonApplicationDto,
  ): IApplication {
    return this.applicationsService.abandon(id, abandonDto);
  }

  /**
   * Observabilidad y Trazabilidad: Expone la línea de tiempo de auditoría del crédito.
   * El controlador consume este sub-recurso delegando de forma limpia.
   */
  @Get(':id/events')
  getEvents(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationsService.getTimeline(id);
  }
}

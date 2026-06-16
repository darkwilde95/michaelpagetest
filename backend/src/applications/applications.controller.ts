import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AbandonApplicationDto } from './dto/abandon-application.dto';
import { ApplicationStatus, Channel } from './interfaces/application.interface';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // POST /applications
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get() // GET /applications
  findAll(
    @Query('status') status?: ApplicationStatus,
    @Query('channel') channel?: Channel,
    @Query('search') search?: string,
  ) {
    return this.applicationsService.findAll(status, channel, search);
  }

  @Get(':id') // GET /applications/{id}
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id') // PATCH /applications/{id}
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Post(':id/simulate-offer')
  @HttpCode(HttpStatus.OK) // POST /applications/{id}/simulate-offer
  simulateOffer(
    @Param('id') id: string,
    @Query('forceResult') forceResult?: 'success' | 'unviable' | 'error',
  ) {
    return this.applicationsService.simulateOffer(id, forceResult);
  }

  @Post(':id/finalize')
  @HttpCode(HttpStatus.OK) // POST /applications/{id}/finalize
  finalize(@Param('id') id: string) {
    return this.applicationsService.finalize(id);
  }

  @Post(':id/abandon')
  @HttpCode(HttpStatus.OK) // POST /applications/{id}/abandon
  abandon(
    @Param('id') id: string,
    @Body() abandonApplicationDto: AbandonApplicationDto,
  ) {
    return this.applicationsService.abandon(id, abandonApplicationDto);
  }

  @Get(':id/events') // GET /applications/{id}/events
  getEvents(@Param('id') id: string) {
    return this.applicationsService.getEvents(id);
  }
}

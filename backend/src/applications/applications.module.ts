import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { EventsService } from 'src/events/events.service';

@Module({
  imports: [EventsService],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}

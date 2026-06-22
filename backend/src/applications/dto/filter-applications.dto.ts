import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  ApplicationStatus,
  CustomerChannel,
} from '../interfaces/application.interface';

export class FilterApplicationsDto {
  @IsEnum(ApplicationStatus)
  @IsOptional()
  status?: ApplicationStatus;

  @IsEnum(CustomerChannel)
  @IsOptional()
  channel?: CustomerChannel;

  @IsString()
  @IsOptional()
  search?: string;
}

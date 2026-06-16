import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  Min,
  IsEnum,
} from 'class-validator';
import { ApplicationStep } from '../interfaces/application.interface';

export class UpdateApplicationDto {
  @IsOptional()
  @IsEnum(ApplicationStep, { message: 'El paso proporcionado no es válido' })
  lastStepCompleted?: ApplicationStep;

  @IsOptional()
  @IsNumber()
  @Min(0)
  income?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  expenses?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  requestedAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  desiredTerm?: number;

  @IsOptional()
  @IsString()
  creditPurpose?: string;

  @IsOptional()
  @IsBoolean()
  dataTreatmentAccepted?: boolean;
}

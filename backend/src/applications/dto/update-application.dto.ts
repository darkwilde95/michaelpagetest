import {
  IsNumber,
  IsString,
  IsOptional,
  Min,
  IsPositive,
} from 'class-validator';
import { DocumentType } from '../interfaces/application.interface';

export class UpdateApplicationDto {
  @IsNumber()
  @Min(0, { message: 'Los ingresos no pueden ser negativos' })
  @IsOptional()
  income?: number;

  @IsNumber()
  @Min(0, { message: 'Los egresos no pueden ser negativos' })
  @IsOptional()
  expenses?: number;

  @IsNumber()
  @Min(0, { message: 'El valor solicitado debe ser mayor a cero' })
  @IsOptional()
  requestedAmount?: number;

  @IsNumber()
  @Min(1, { message: 'El plazo mínimo es de 1 mes' })
  @IsOptional()
  desiredTerm?: number;

  @IsString()
  @IsOptional()
  loanPurpose?: string;
}

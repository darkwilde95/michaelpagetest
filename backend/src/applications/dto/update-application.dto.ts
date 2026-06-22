import {
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  Min,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { DocumentType } from '../interfaces/application.interface';

export class UpdateApplicationDto {
  @IsEnum(DocumentType, { message: 'El tipo de documento no es válido' })
  @IsOptional()
  documentType?: DocumentType;

  @IsString()
  @IsOptional()
  documentNumber?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  city?: string;

  // --- Datos Complementarios y Financieros ---
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

  @IsBoolean({
    message: 'Debe especificar la aceptación de tratamiento de datos',
  })
  @IsOptional()
  dataProcessingAccepted?: boolean;
}

import {
  IsEnum,
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsEmail,
} from 'class-validator';
import {
  CustomerChannel,
  DocumentType,
} from '../interfaces/application.interface';

export class CreateApplicationDto {
  @IsEnum(CustomerChannel, {
    message: 'El canal debe ser Autogestionado o Asistido',
  })
  @IsNotEmpty()
  channel!: CustomerChannel;

  @ValidateIf((o) => o.channel === CustomerChannel.ASSISTED)
  @IsString()
  @IsNotEmpty({
    message: 'El id del asesor es requerido para el canal asistido.',
  })
  advisorId?: string;

  @IsEnum(DocumentType, { message: 'El tipo de documento no es válido' })
  @IsNotEmpty()
  documentType!: DocumentType;

  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;
}

import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsEmail,
  ValidateIf,
} from 'class-validator';
import { Channel, DocumentType } from '../interfaces/application.interface';

export class CreateApplicationDto {
  @IsEnum(Channel)
  channel: Channel;

  @ValidateIf((o) => o.channel === Channel.ASSISTED)
  @IsNotEmpty({
    message: 'El ID del asesor es obligatorio cuando el canal es ASISTIDO.',
  })
  @IsString()
  advisorId?: string;

  @IsEnum(DocumentType, {
    message:
      'El tipo de documento debe ser uno de los siguientes valores: CC, CE, PAS, PPT',
  })
  documentType: DocumentType;

  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @IsNotEmpty()
  @IsString()
  names: string;

  @IsNotEmpty()
  @IsString()
  cellphone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  city: string;
}

import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AbandonApplicationDto {
  @IsString()
  @IsNotEmpty({ message: 'El motivo de abandono no puede estar vacío' })
  @MinLength(10, {
    message:
      'Por favor, describe el motivo con mayor detalle (mínimo 10 caracteres)',
  })
  abandonmentReason!: string;
}

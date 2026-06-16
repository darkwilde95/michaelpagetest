import { IsNotEmpty, IsString } from 'class-validator';

export class AbandonApplicationDto {
  @IsNotEmpty()
  @IsString()
  reason: string;
}

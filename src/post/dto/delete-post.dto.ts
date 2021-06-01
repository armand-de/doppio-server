import { IsString, IsUUID } from 'class-validator';

export class DeletePostDto {
  @IsUUID()
  @IsString()
  readonly id: string;
}

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { OptionalUserIdDto } from '../../user/dto/optional-user-id.dto';

export class CreatePostDto extends OptionalUserIdDto {
  @IsNotEmpty()
  @MaxLength(40)
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsString()
  readonly contents: string;
}

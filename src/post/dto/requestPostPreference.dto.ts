import { IsString, IsUUID } from 'class-validator';
import { OptionalUserIdDto } from '../../user/dto/optional-user-id.dto';

export class RequestPostPreferenceDto extends OptionalUserIdDto {
  @IsString()
  @IsUUID()
  postId: string;
}

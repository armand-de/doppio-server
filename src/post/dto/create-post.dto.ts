import { CreatePostRequestDto } from './create-post-request.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { UserIdDto } from './user-id.dto';

export class CreatePostDto extends IntersectionType(
  CreatePostRequestDto,
  UserIdDto,
) {}

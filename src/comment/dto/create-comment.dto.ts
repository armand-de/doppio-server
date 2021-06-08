import { IntersectionType } from '@nestjs/mapped-types';
import { UserIdDto } from '../../user/dto/user-id.dto';
import { CreateCommentRequestDto } from './create-comment-request.dto';

export class CreateCommentDto extends IntersectionType(
  CreateCommentRequestDto,
  UserIdDto,
) {}

import { IntersectionType } from '@nestjs/mapped-types';
import { UserIdDto } from '../../user/dto/user-id.dto';
import { DeleteRecipeRequestDto } from './delete-recipe-request.dto';

export class DeleteRecipeDto extends IntersectionType(
  DeleteRecipeRequestDto,
  UserIdDto,
) {}

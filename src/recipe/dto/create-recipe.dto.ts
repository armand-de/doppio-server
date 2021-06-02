import { IntersectionType } from '@nestjs/mapped-types';
import { CreateRecipeRequestDto } from './create-recipe-request.dto';
import { UserIdDto } from '../../user/dto/user-id.dto';

export class CreateRecipeDto extends IntersectionType(
  CreateRecipeRequestDto,
  UserIdDto,
) {}

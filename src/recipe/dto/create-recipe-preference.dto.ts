import { IntersectionType } from '@nestjs/mapped-types';
import { CreateRecipePreferenceRequestDto } from './create-recipe-preference-request.dto';
import { UserIdDto } from '../../user/dto/user-id.dto';

export class CreateRecipePreferenceDto extends IntersectionType(
  CreateRecipePreferenceRequestDto,
  UserIdDto,
) {}

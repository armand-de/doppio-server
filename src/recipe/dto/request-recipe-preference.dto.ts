import { IntersectionType } from '@nestjs/mapped-types';
import { RecipeIdDto } from './recipe-id.dto';
import { OptionalUserIdDto } from '../../user/dto/optional-user-id.dto';

export class RequestRecipePreferenceDto extends IntersectionType(
  RecipeIdDto,
  OptionalUserIdDto,
) {}

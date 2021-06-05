import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entity/recipe.entity';
import { StatusResponse } from '../types/status-response';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { UserService } from '../user/user.service';
import { RECIPE_GET_SELECT, RECIPE_LIST_SELECT } from '../utils/data-select';
import { selectUserPipeline } from '../utils/select-user-pipeline';

const RECIPE_LIST_STEP_POINT = 15;

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    private readonly userService: UserService,
  ) {}

  async getRecipeList(step: number): Promise<Recipe[]> {
    const amount = await this.getAmountOfRecipe();
    return await this.recipeRepository.find({
      skip: (step - 1) * RECIPE_LIST_STEP_POINT,
      take: step * RECIPE_LIST_STEP_POINT,
      select: RECIPE_LIST_SELECT,
    });
  }

  async getRecipeById(id: string): Promise<Recipe> {
    return await this.recipeRepository.findOne({
      where: { id },
      select: RECIPE_GET_SELECT,
    });
  }

  async getAmountOfRecipe(): Promise<number> {
    return await this.recipeRepository.count();
  }

  async getRecipeIncludeUserById(id: string): Promise<Recipe> {
    const data = await this.recipeRepository.findOne({
      where: { id },
      select: ['user', ...RECIPE_GET_SELECT],
      relations: ['user'],
    });
    return selectUserPipeline(data);
  }

  async createRecipe({
    userId,
    ...createRecipeDto
  }: CreateRecipeDto): Promise<StatusResponse> {
    try {
      const user = await this.userService.getUserById(userId);
      const newRecipe = await this.recipeRepository.create({
        user,
        ...createRecipeDto,
      });
      await this.recipeRepository.save(newRecipe);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from "typeorm";
import { Recipe } from './entity/recipe.entity';
import { StatusResponse } from '../types/status-response';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { RECIPE_GET_SELECT, RECIPE_LIST_SELECT } from '../utils/data-select';
import { selectUserPipeline } from '../utils/select-user-pipeline';
import { RecipePreference } from './entity/recipe-preference.entity';
import { DeleteRecipePreferenceDto } from './dto/delete-recipe-preference.dto';
import { CreateRecipePreferenceDto } from './dto/create-recipe-preference.dto';
import { RecipeIncludePreference } from './interface/recipe-include-preference.interface';

const RECIPE_LIST_STEP_POINT = 15;

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipePreference)
    private recipePreferenceRepository: Repository<RecipePreference>,
  ) {}

  async getRecipeList(step: number): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      skip: (step - 1) * RECIPE_LIST_STEP_POINT,
      take: step * RECIPE_LIST_STEP_POINT,
      select: RECIPE_LIST_SELECT,
    });
  }

  async getRecipeIncludePreferenceCountList(
    step: number,
  ): Promise<RecipeIncludePreference[]> {
    const recipeList: RecipeIncludePreference[] = await this.getRecipeList(
      step,
    );
    const recipeIncludePreferenceCountList = [];
    if (recipeList.length) {
      for (let idx = 0; idx < recipeList.length; idx++) {
        const preference = await this.getPreferenceByRecipeId(
          recipeList[idx].id,
        );
        recipeIncludePreferenceCountList.push({
          ...recipeList[idx],
          preference,
        });
      }
    }
    return recipeIncludePreferenceCountList;
  }

  async getRecipeById(id: string): Promise<RecipeIncludePreference> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      select: RECIPE_GET_SELECT,
    });
    const preference = await this.getPreferenceByRecipeId(id);
    return { preference, ...recipe };
  }

  async getPreferenceByRecipeId(recipeId): Promise<number> {
    return await this.recipePreferenceRepository.count({
      where: {
        recipe: recipeId,
      },
    });
  }

  async getRecipePreferenceByRecipeId(recipeId): Promise<RecipePreference> {
    return await this.recipePreferenceRepository.findOne({
      where: {
        recipe: recipeId,
      },
    });
  }

  async getRecipePreferenceByRecipeIdAndUserId({
    recipeId,
    userId,
  }): Promise<RecipePreference> {
    return await this.recipePreferenceRepository.findOne({
      where: {
        recipe: recipeId,
        user: userId,
      },
    });
  }

  async getAmountOfRecipePage(): Promise<number> {
    const amount = await this.getAmountOfRecipe();
    const pageAmount = amount / RECIPE_LIST_STEP_POINT;
    return pageAmount < 1 ? 1 : pageAmount;
  }

  async getAmountOfRecipe(): Promise<number> {
    return await this.recipeRepository.count();
  }

  async getRecipeIncludeUserById(id: string): Promise<RecipeIncludePreference> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      select: ['user', ...RECIPE_GET_SELECT],
      relations: ['user'],
    });
    const preference = await this.getPreferenceByRecipeId(id);
    return selectUserPipeline({ preference, ...recipe });
  }

  async searchRecipe(keyword: string): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      where: {
        name: Like(`%${keyword}%`),
      },
      select: RECIPE_LIST_SELECT,
    });
  }

  async createRecipePreference(
    createRecipePreferenceDto: CreateRecipePreferenceDto,
  ): Promise<StatusResponse> {
    try {
      if (
        !(await this.getRecipePreferenceByRecipeIdAndUserId(
          createRecipePreferenceDto,
        ))
      ) {
        const { userId, recipeId } = createRecipePreferenceDto;
        const newRecipePreference =
          await this.recipePreferenceRepository.create({
            user: { id: userId },
            recipe: { id: recipeId },
          });
        await this.recipePreferenceRepository.save(newRecipePreference);
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async deleteRecipePreference(
    deleteRecipePreferenceDto: DeleteRecipePreferenceDto,
  ): Promise<StatusResponse> {
    try {
      const id = (
        await this.getRecipePreferenceByRecipeIdAndUserId(
          deleteRecipePreferenceDto,
        )
      )?.id;
      if (id) {
        await this.recipePreferenceRepository.delete({ id });
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async createRecipe({
    userId,
    ...createRecipeDto
  }: CreateRecipeDto): Promise<StatusResponse> {
    try {
      const newRecipe = await this.recipeRepository.create({
        user: { id: userId },
        ...createRecipeDto,
      });
      await this.recipeRepository.save(newRecipe);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }
}

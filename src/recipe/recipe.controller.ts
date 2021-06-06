import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StatusResponse } from '../types/status-response';
import { CreateRecipeRequestDto } from './dto/create-recipe-request.dto';
import { Recipe } from './entity/recipe.entity';
import { RecipePreference } from './entity/recipe-preference.entity';
import { CreateRecipePreferenceRequestDto } from './dto/create-recipe-preference-request.dto';
import { DeleteRecipePreferenceRequestDto } from './dto/delete-recipe-preference-request.dto';
import { RecipeIncludePreferenceCount } from './interface/recipe-include-preference-count.interface';
import { GetPageAmountResponse } from './interface/get-page-amount-response.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('/list/:step')
  async getRecipeList(
    @Param('step', ParseIntPipe) step: number,
  ): Promise<Recipe[]> {
    return await this.recipeService.getRecipeList(step);
  }

  @Get('/list/:step/preference')
  async getRecipeIncludePreferenceCountList(
    @Param('step', ParseIntPipe) step: number,
  ): Promise<RecipeIncludePreferenceCount[]> {
    return await this.recipeService.getRecipeIncludePreferenceCountList(step);
  }

  @Get('/list/amount/page')
  async getAmountOfRecipePage(): Promise<GetPageAmountResponse> {
    return {
      amount: await this.recipeService.getAmountOfRecipePage(),
    };
  }

  @Get('/get/id/:id')
  async getRecipeById(@Param('id') id: string): Promise<Recipe> {
    return await this.recipeService.getRecipeById(id);
  }

  @Get('/get/id/:id/preference')
  async getRecipeIncludeNumberOfPreferenceById(
    @Param('id') id: string,
  ): Promise<Recipe> {
    return await this.recipeService.getRecipeIncludePreferenceCountById(id);
  }

  @Get('/get/id/:id/user')
  async getRecipeIncludeUserById(@Param('id') id: string): Promise<Recipe> {
    return await this.recipeService.getRecipeIncludeUserById(id);
  }

  @Get('/get/preference/:id')
  async getRecipePreferenceByRecipeId(
    @Param('id') id: string,
  ): Promise<RecipePreference> {
    return await this.recipeService.getRecipePreferenceByRecipeId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create/preference')
  async createRecipePreference(
    @Req() req: any,
    @Body() { recipeId }: CreateRecipePreferenceRequestDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.createRecipePreference({
      recipeId,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/preference')
  async deleteRecipePreference(
    @Req() req: any,
    @Body() { recipeId }: DeleteRecipePreferenceRequestDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.deleteRecipePreference({
      recipeId,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRecipe(
    @Req() req: any,
    @Body() createRecipeRequestDto: CreateRecipeRequestDto,
  ): Promise<StatusResponse> {
    const { id } = req.user;
    return await this.recipeService.createRecipe({
      userId: id,
      ...createRecipeRequestDto,
    });
  }
}

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
import { CreateRecipePreferenceRequestDto } from './dto/create-recipe-preference-request.dto';
import { DeleteRecipePreferenceRequestDto } from './dto/delete-recipe-preference-request.dto';
import { RecipeIncludePreference } from './interface/recipe-include-preference.interface';
import { GetCountResponse } from './interface/get-count-response.interface';
import { DeleteRecipeRequestDto } from './dto/delete-recipe-request.dto';
import { RecipePreference } from "./entity/recipe-preference.entity";

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
  ): Promise<RecipeIncludePreference[]> {
    return await this.recipeService.getRecipeIncludePreferenceList(step);
  }

  @Get('/count/page')
  async getCountOfRecipePage(): Promise<GetCountResponse> {
    return {
      count: await this.recipeService.getCountOfRecipePage(),
    };
  }

  @Get('/count')
  async getCountOfRecipe(): Promise<GetCountResponse> {
    return {
      count: await this.recipeService.getCountOfRecipe(),
    };
  }

  @Get('/find/id/:id')
  async getRecipeById(
    @Param('id') id: string,
  ): Promise<RecipeIncludePreference> {
    return await this.recipeService.getRecipeById(id);
  }

  @Get('/find/id/:id/user')
  async getRecipeIncludeUserById(
    @Param('id') id: string,
  ): Promise<RecipeIncludePreference> {
    return await this.recipeService.getRecipeIncludeUserById(id);
  }

  @Get('/search/:keyword')
  async searchRecipe(@Param('keyword') keyword: string): Promise<Recipe[]> {
    return await this.recipeService.searchRecipe(keyword);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRecipe(
    @Req() req: any,
    @Body() createRecipeRequestDto: CreateRecipeRequestDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.createRecipe({
      userId,
      ...createRecipeRequestDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async deleteRecipe(
    @Req() req: any,
    @Body() deleteRecipeRequestDto: DeleteRecipeRequestDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.deleteRecipe({
      userId,
      ...deleteRecipeRequestDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my/preference')
  async getMyRecipePreference(
    @Req() req: any,
    @Body('recipeId') recipeId: string,
  ): Promise<RecipePreference> {
    const { id: userId } = req.user;
    return await this.recipeService.getMyRecipePreference({ userId, recipeId });
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
}

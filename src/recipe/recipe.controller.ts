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
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entity/recipe.entity';
import { RecipeIncludePreference } from './interface/recipe-include-preference.interface';
import { GetCountResponse } from './interface/get-count-response.interface';
import { DeleteRecipeDto } from './dto/delete-recipe.dto';
import { RecipePreference } from './entity/recipe-preference.entity';
import { RequestRecipePreferenceDto } from './dto/request-recipe-preference.dto';

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
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.createRecipe({
      userId,
      ...createRecipeDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async deleteRecipe(
    @Req() req: any,
    @Body() deleteRecipeDto: DeleteRecipeDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.deleteRecipe({
      userId,
      ...deleteRecipeDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my/preference')
  async getMyRecipePreference(
    @Req() req: any,
    @Body() { recipeId }: RequestRecipePreferenceDto,
  ): Promise<RecipePreference> {
    const { id: userId } = req.user;
    return await this.recipeService.getPreferenceByRecipeIdAndUserId({
      userId,
      recipeId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create/preference')
  async createRecipePreference(
    @Req() req: any,
    @Body() { recipeId }: RequestRecipePreferenceDto,
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
    @Body() { recipeId }: RequestRecipePreferenceDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.deleteRecipePreference({
      recipeId,
      userId,
    });
  }
}

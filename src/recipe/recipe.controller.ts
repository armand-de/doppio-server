import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
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
import { RequestRecipePreferenceDto } from './dto/request-recipe-preference.dto';
import { GetIsExistResponse } from '../utils/get-is-exist-response.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('/list')
  async getRecipeList(
    @Query('step', ParseIntPipe) step: number,
  ): Promise<Recipe[]> {
    return await this.recipeService.getRecipeList(step);
  }

  @Get('/list/preference')
  async getRecipeIncludePreferenceCountList(
    @Query('step', ParseIntPipe) step: number,
  ): Promise<RecipeIncludePreference[]> {
    return await this.recipeService.getRecipeListIncludePreference(step);
  }

  @Get('/list/category/:category')
  async getRecipeListByCategory(
    @Query('step', ParseIntPipe) step: number,
    @Param('category', ParseIntPipe) category: number,
  ): Promise<Recipe[]> {
    return await this.recipeService.getRecipeListByCategory({ step, category });
  }

  @Get('/list/search/:keyword')
  async searchRecipe(
    @Query('step', ParseIntPipe) step: number,
    @Param('keyword') keyword: string,
  ): Promise<Recipe[]> {
    return await this.recipeService.searchRecipe({ keyword, step });
  }

  @Get('/count')
  async getCountOfRecipe(): Promise<GetCountResponse> {
    return {
      count: await this.recipeService.getCountOfRecipe(),
    };
  }

  @Get('/count/page')
  async getCountOfRecipePage(): Promise<GetCountResponse> {
    return {
      count: await this.recipeService.getCountOfRecipePage(),
    };
  }

  @Get('/count/search/:keyword')
  async getCountSearch(
    @Param('keyword') keyword: string,
  ): Promise<GetCountResponse> {
    return {
      count: await this.recipeService.getCountSearchRecipe(keyword),
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
  @Post('/is-exist/preference/my')
  async getMyRecipePreferenceIsExist(
    @Req() req: any,
    @Body() { recipeId }: RequestRecipePreferenceDto,
  ): Promise<GetIsExistResponse> {
    const { id: userId } = req.user;
    return {
      isExist: !!(await this.recipeService.getPreferenceByRecipeIdAndUserId({
        userId,
        recipeId,
      })),
    };
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

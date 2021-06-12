import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { GetCountResponse } from '../utils/get-count-response.interface';
import { RequestRecipePreferenceDto } from './dto/request-recipe-preference.dto';
import { GetIsExistResponse } from '../utils/get-is-exist-response.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMyRecipeList(@Req() req: any): Promise<Recipe[]> {
    const { id } = req.user;
    return await this.recipeService.getMyRecipeList(id);
  }

  @Get('/list')
  async getRecipeList(@Query('start') start: number): Promise<Recipe[]> {
    return await this.recipeService.getRecipeList(start);
  }

  @Get('/list/search')
  async searchRecipe(
    @Query('start', ParseIntPipe) start?: number,
    @Query('keyword') keyword?: string,
    @Query('category') category?: string,
  ): Promise<Recipe[]> {
    if (keyword || category) {
      return await this.recipeService.searchRecipe({
        keyword,
        category,
        start,
      });
    }
    throw new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
  }

  @Get('/count')
  async getCountOfRecipe(): Promise<GetCountResponse> {
    return {
      count: await this.recipeService.getCountOfRecipe(),
    };
  }

  @Get('/count/page/search/:keyword')
  async getCountPageOfSearchRecipe(
    @Param('keyword') keyword: string,
  ): Promise<GetCountResponse> {
    return {
      count: await this.recipeService.getCountPageOfSearchRecipe(keyword),
    };
  }

  @Get('/find/id/:id')
  async getRecipeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RecipeIncludePreference> {
    return await this.recipeService.getRecipeById(id);
  }

  @Get('/find/id/:id/user')
  async getRecipeIncludeUserById(
    @Param('id', ParseIntPipe) id: number,
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
  @Delete('/delete/:id')
  async deleteRecipe(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StatusResponse> {
    return await this.recipeService.deleteRecipe(id);
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
        recipeId,
        userId,
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { StatusResponse } from '../types/status-response';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Post as PostEntity } from './entity/post.entity';
import { PostResponse } from './interface/post-response.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { RequestPostPreferenceDto } from './dto/requestPostPreference.dto';
import { GetIsExistResponse } from '../utils/get-is-exist-response.interface';
import { GetCountResponse } from '../utils/get-count-response.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/list')
  async getPostList(
    @Query('step', ParseIntPipe) step: number,
  ): Promise<PostEntity[]> {
    return await this.postService.getPostList(step);
  }

  @Get('/list/search/:keyword')
  async searchPost(
    @Param('keyword') keyword: string,
    @Query('step', ParseIntPipe) step: number,
  ): Promise<PostEntity[]> {
    return await this.postService.searchPost({ keyword, step });
  }

  @Get('/count')
  async getCountOfPost(): Promise<GetCountResponse> {
    const count = await this.postService.getCountOfPost();
    return { count };
  }

  @Get('/count/page')
  async getCountPageOfPost(): Promise<GetCountResponse> {
    const count = await this.postService.getCountPageOfPost();
    return { count };
  }

  @Get('/count/page/search/:keyword')
  async getCountPageOfSearchPost(
    @Param('keyword') keyword: string,
  ): Promise<GetCountResponse> {
    return {
      count: await this.postService.getCountPageOfSearchPost(keyword),
    };
  }

  @Get('/find/id/:id')
  async getPostById(@Param('id') id: string): Promise<PostResponse> {
    return await this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createPost(
    @Req() req: any,
    @Body() createPostDto: CreatePostDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.postService.createPost({
      userId,
      ...createPostDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deletePost(@Param('id') id: string): Promise<StatusResponse> {
    return await this.postService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/is-exist/preference/:postId')
  async getMyPostPreferenceIsExist(
    @Req() req: any,
    @Param('postId') postId: string,
  ): Promise<GetIsExistResponse> {
    const { id: userId } = req.user;
    return {
      isExist: !!(await this.postService.getPostPreferenceByUserIdAndPostId({
        postId,
        userId,
      })),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create/preference')
  async createPostPreference(
    @Req() req: any,
    @Body() { postId }: RequestPostPreferenceDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.postService.createPostPreference({
      postId,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/preference')
  async deletePostPreference(
    @Req() req: any,
    @Body() { postId }: RequestPostPreferenceDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.postService.deletePostPreference({
      postId,
      userId,
    });
  }
}

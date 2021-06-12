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
import { GetIsExistResponse } from '../utils/get-is-exist-response.interface';
import { GetCountResponse } from '../utils/get-count-response.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMyPostList(@Req() req: any): Promise<PostEntity[]> {
    const { id } = req.user;
    return await this.postService.getMyPostList(id);
  }

  @Get('/list')
  async getPostList(
    @Query('start', ParseIntPipe) start: number,
  ): Promise<PostEntity[]> {
    return await this.postService.getPostList(start);
  }

  @Get('/list/search/:keyword')
  async searchPost(
    @Param('keyword') keyword: string,
    @Query('start', ParseIntPipe) start: number,
  ): Promise<PostEntity[]> {
    return await this.postService.searchPost({ keyword, start });
  }

  @Get('/find/id/:id')
  async getPostById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponse> {
    return await this.postService.getPostById(id);
  }

  @Get('/count/list')
  async getCountOfPost(): Promise<GetCountResponse> {
    const count = await this.postService.getCountOfPost();
    return { count };
  }

  @Get('/count/list/search/:keyword')
  async getSearchPost(
    @Param('keyword') keyword: string,
  ): Promise<GetCountResponse> {
    const count = await this.postService.getCountOfSearchPost(keyword);
    return { count };
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
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StatusResponse> {
    return await this.postService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/is-exist/preference/:postId')
  async getMyPostPreferenceIsExist(
    @Req() req: any,
    @Param('postId', ParseIntPipe) postId: number,
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
    @Body('postId', ParseIntPipe) postId: number,
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
    @Body('postId') postId: number,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.postService.deletePostPreference({
      postId,
      userId,
    });
  }
}

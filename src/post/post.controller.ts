import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseBoolPipe,
  ParseIntPipe,
  Post, Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { PostService } from './post.service';
import { StatusResponse } from '../types/status-response';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Post as PostEntity } from './entity/post.entity';
import { PostResponse } from './interface/post-response.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/list')
  async getPostList(
    @Query('step', ParseIntPipe) step: number,
    @Query('user', ParseBoolPipe) user: boolean,
  ): Promise<PostEntity[]> {
    if (user) {
      return await this.postService.getPostListIncludeUser(step);
    }
    return await this.postService.getPostList(step);
  }

  @Get('/find/id/:id')
  async getPostById(
    @Param('id') id: string,
    @Query('user') user: boolean,
  ): Promise<PostResponse> {
    if (user) {
      return await this.postService.getPostIncludeUserById(id);
    }
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
}

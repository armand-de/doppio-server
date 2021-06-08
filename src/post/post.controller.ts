import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { StatusResponse } from '../types/status-response';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { Post as PostEntity } from './entity/post.entity';
import { PostResponse } from './interface/post-response.interface';
import { PostPreference } from "./entity/post-preference.entity";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/list/:step')
  async getPostList(
    @Param('step', ParseIntPipe) step: number,
  ): Promise<PostEntity[]> {
    return await this.postService.getPostList(step);
  }

  @Get('/list/:step/user')
  async getPostListIncludeUser(
    @Param('step', ParseIntPipe) step: number,
  ): Promise<PostResponse[]> {
    return await this.postService.getPostListIncludeUser(step);
  }

  @Get('/find/id/:id')
  async getPostById(@Param('id') id: string): Promise<PostResponse> {
    return await this.postService.getPostById(id);
  }

  @Get('/find/id/:id/user')
  async getPostIncludeUserById(@Param('id') id: string): Promise<PostResponse> {
    return await this.postService.getPostIncludeUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createPost(
    @Req() req: any,
    @Body() createPostRequestDto: CreatePostRequestDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.postService.createPost({
      userId,
      ...createPostRequestDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deletePost(@Param('id') id: string): Promise<StatusResponse> {
    return await this.postService.deletePost(id);
  }
}

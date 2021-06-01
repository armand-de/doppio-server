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
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { StatusResponse } from './interface/status-response.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { Post as PostEntity } from './entity/post.entity';
import { DeletePostDto } from './dto/delete-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/list/:step')
  async getPostList(
    @Param('step', ParseIntPipe) step: number,
  ): Promise<PostEntity[]> {
    return this.postService.getPostList(step);
  }

  @Get('/get/id/:id')
  async getPostById(@Param() { id }): Promise<PostEntity> {
    return await this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createPost(
    @Req() req: any,
    @Body() createPostRequestDto: CreatePostRequestDto,
  ): Promise<StatusResponse> {
    const id = req?.user?.id;
    if (id) {
      return await this.postService.createPost({
        userId: id,
        ...createPostRequestDto,
      });
    }
    throw new HttpException('Server Error', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deletePost(@Req() { id }: DeletePostDto): Promise<StatusResponse> {
    return await this.postService.deletePost(id);
  }
}

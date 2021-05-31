import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus, Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { StatusResponse } from './interface/status-response.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { Post } from './entity/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/get/:id')
  async getPostById(@Param() params): Promise<Post> {
    return await this.postService.getPostById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/create')
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
}

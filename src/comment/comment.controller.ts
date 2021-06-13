import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StatusResponse } from '../types/status-response';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';
import { GetCountResponse } from '../utils/get-count-response.interface';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/list/:postId')
  async getCommentList(
    @Req() req: any,
    @Param('postId', ParseIntPipe) postId: number,
    @Query('start', ParseIntPipe) start: number,
  ): Promise<Comment[]> {
    const { id: userId } = req.user;
    return await this.commentService.getCommentList({
      postId,
      userId,
      start,
    });
  }

  @Get('/count/list/:postId')
  async getCountOfComment(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<GetCountResponse> {
    const count = await this.commentService.getCountOfComment(postId);
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createComment(
    @Req() req: any,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.commentService.createComment({
      ...createCommentRequestDto,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:postId')
  async deleteComment(
    @Req() req: any,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.commentService.deleteComment({ userId, postId });
  }
}

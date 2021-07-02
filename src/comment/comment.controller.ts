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
import { IStatusResponse, ICountResponse } from '../types/response';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCommentList(
    @Req() req: any,
    @Param('id', ParseIntPipe) postId: number,
    @Query('start', ParseIntPipe) start: number,
  ): Promise<Comment[]> {
    const { id: userId } = req.user;
    return await this.commentService.getCommentList({
      postId,
      userId,
      start,
    });
  }

  @Get('count/:id')
  async getCountOfComment(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<ICountResponse> {
    const count = await this.commentService.getCountOfComment(postId);
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @Req() req: any,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ): Promise<IStatusResponse> {
    const { id: userId } = req.user;
    return await this.commentService.createComment({
      ...createCommentRequestDto,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IStatusResponse> {
    const { id: userId } = req.user;
    return await this.commentService.deleteComment({ userId, id });
  }
}

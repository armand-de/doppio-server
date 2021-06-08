import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StatusResponse } from '../types/status-response';
import { CreateCommentRequestDto } from './dto/create-comment-request.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/comments/:id')
  async getCommentsByPostId(@Param('id') id: string): Promise<Comment[]> {
    return await this.commentService.getCommentsByPostId(id);
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
      ...userId,
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { StatusResponse } from '../types/status-response';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async getCommentsByPostId(id: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: {
        post: { id },
      },
    });
  }

  async createComment({
    userId,
    postId,
    contents,
  }: CreateCommentDto): Promise<StatusResponse> {
    try {
      const newComment = await this.commentRepository.create({
        user: { id: userId },
        post: { id: postId },
        contents,
      });
      await this.commentRepository.save(newComment);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }
}

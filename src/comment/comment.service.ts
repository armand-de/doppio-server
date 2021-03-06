import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { IStatusResponse } from '../types/response';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { CreateCommentDto } from './dto/create-comment.dto';
import { COMMENT_SELECT } from '../utils/data-select';
import { LIST_WHERE_OPTION } from '../utils/list-where-option';

const COMMENT_LIST_STEP_POINT = 30;

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async getCommentList({ postId, userId, start }): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: {
        post: { id: postId },
        ...LIST_WHERE_OPTION(start),
      },
      select: COMMENT_SELECT,
      take: COMMENT_LIST_STEP_POINT,
      relations: ['user'],
      order: {
        id: 'DESC',
        user: userId,
      },
    });
  }

  async getCountOfComment(postId: number): Promise<number> {
    return await this.commentRepository.count({
      post: { id: postId },
    });
  }

  async createComment({
    userId,
    postId,
    contents,
  }: CreateCommentDto): Promise<IStatusResponse> {
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

  async deleteComment({ userId, id }): Promise<IStatusResponse> {
    try {
      await this.commentRepository.delete({
        id,
        user: { id: userId },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { StatusResponse } from '../types/status-response';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { CreateCommentDto } from './dto/create-comment.dto';
import { COMMENT_SELECT } from '../utils/data-select';
import { selectUserListPipeline } from '../utils/select-user-pipeline';
import { LIST_WHERE_OPTION } from '../utils/list-where-option';

const COMMENT_LIST_STEP_POINT = 30;

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async getCommentList({ postId, userId, start }): Promise<Comment[]> {
    const commentList = await this.commentRepository.find({
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
    return selectUserListPipeline(commentList);
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

  async deleteComment({ userId, id }): Promise<StatusResponse> {
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

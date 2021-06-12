import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { StatusResponse } from '../types/status-response';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { CreateCommentDto } from './dto/create-comment.dto';
import { COMMENT_SELECT } from '../utils/data-select';
import { selectUserListPipeline } from '../utils/select-user-pipeline';
import { GetCountResponse } from "../utils/get-count-response.interface";

const COMMENT_LIST_STEP_POINT = 30;

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async getCommentList({ postId, userId, step }): Promise<Comment[]> {
    const commentList = await this.commentRepository.find({
      where: {
        post: { id: postId },
      },
      select: COMMENT_SELECT,
      skip: COMMENT_LIST_STEP_POINT * (step - 1),
      take: COMMENT_LIST_STEP_POINT * step,
      relations: ['user'],
      order: {
        user: userId,
      },
    });
    return selectUserListPipeline(commentList);
  }

  async getCountOfComment(postId: string): Promise<number> {
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

  async deleteComment({ userId, postId }): Promise<StatusResponse> {
    try {
      await this.commentRepository.delete({
        user: { id: userId },
        post: { id: postId },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }
}

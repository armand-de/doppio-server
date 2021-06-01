import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { StatusResponse } from './interface/status-response.interface';
import { SUCCESS_RESPONSE } from '../utils/success-response';

const POST_SELECT: (keyof Post)[] = [
  'id',
  'title',
  'image',
  'contents',
  'createdDate',
];
const POST_LIST_STEP_POINT = 15;

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getPostList(step: number): Promise<Post[]> {
    return await this.postRepository.find({
      skip: POST_LIST_STEP_POINT * (step - 1),
      take: POST_LIST_STEP_POINT * step,
    });
  }

  async getPostById(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      select: POST_SELECT,
    });
  }

  async getPostIncludeUserById(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      select: ['user', ...POST_SELECT],
    });
  }

  async createPost(createPostDto: CreatePostDto): Promise<StatusResponse> {
    try {
      const newPost = await this.postRepository.create(createPostDto);
      await this.postRepository.save(newPost);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async deletePost(id: string): Promise<StatusResponse> {
    try {
      await this.postRepository.delete({ id });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }
}

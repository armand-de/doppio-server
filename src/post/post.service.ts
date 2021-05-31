import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { StatusResponse } from './interface/status-response.interface';

const response = { success: true };
const getUserSelectList: (keyof Post)[] = [
  'id',
  'title',
  'image',
  'contents',
  'createdDate',
];

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getPostById(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      select: getUserSelectList,
    });
  }

  async getPostIncludeUserById(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      select: ['user', ...getUserSelectList],
    });
  }

  async createPost(createPostDto: CreatePostDto): Promise<StatusResponse> {
    try {
      const newPost = await this.postRepository.create(createPostDto);
      await this.postRepository.save(newPost);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return response;
  }
}

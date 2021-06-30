import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { StatusResponse } from '../types/status-response';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { POST_GET_SELECT, POST_LIST_SELECT } from '../utils/data-select';
import { PostPreference } from './entity/post-preference.entity';
import { PostIncludePreference } from './interface/post-include-preference.interface';
import { RequestPostPreferenceDto } from './dto/requestPostPreference.dto';
import { LIST_WHERE_OPTION } from '../utils/list-where-option';

const POST_LIST_STEP_POINT = 15;
const POST_LIST_OPTION: FindManyOptions<Post> = {
  take: POST_LIST_STEP_POINT,
  select: POST_LIST_SELECT,
  relations: ['user'],
  order: {
    id: 'DESC',
  },
};

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(PostPreference)
    private postPreferenceRepository: Repository<PostPreference>,
  ) {}

  async getMyPostList(userId: string): Promise<Post[]> {
    return await this.postRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'title', 'image', 'createdDate'],
      order: {
        id: 'DESC',
      },
    });
  }

  async getPostList({ start, keyword }): Promise<Post[]> {
    const postList = await this.postRepository.find({
      where: keyword
        ? [
            {
              ...(keyword ? { contents: Like(`%${keyword}%`) } : {}),
              ...LIST_WHERE_OPTION(start),
            },
            {
              ...(keyword ? { title: Like(`%${keyword}%`) } : {}),
              ...LIST_WHERE_OPTION(start),
            },
          ]
        : LIST_WHERE_OPTION(start),
      ...POST_LIST_OPTION,
    });
    return await this.postPreferenceListPipeline(postList);
  }

  async getCountOfPost(keyword?: string): Promise<number> {
    return await this.postRepository.count(
      keyword
        ? {
            where: [
              { title: Like(`%${keyword}%`) },
              { contents: Like(`%${keyword}%`) },
            ],
          }
        : {},
    );
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      select: POST_GET_SELECT,
      relations: ['user'],
    });
    return await this.postPreferencePipeline(post);
  }

  async getPostPreferenceCountByPostId(id: number): Promise<number> {
    return await this.postPreferenceRepository.count({ post: { id } });
  }

  private async postPreferencePipeline(
    post: Post,
  ): Promise<PostIncludePreference> {
    const preference = await this.getPostPreferenceCountByPostId(post.id);
    return { preference, ...post };
  }

  private async postPreferenceListPipeline(
    postArray: Post[],
  ): Promise<PostIncludePreference[]> {
    const resultArray = [];
    if (postArray.length) {
      for (let idx = 0; idx < postArray.length; idx++) {
        const post = await this.postPreferencePipeline(postArray[idx]);
        resultArray.push(post);
      }
    }
    return resultArray;
  }

  async createPost({
    userId,
    ...createPostDto
  }: CreatePostDto): Promise<StatusResponse> {
    try {
      const newPost = await this.postRepository.create({
        user: { id: userId },
        ...createPostDto,
      });
      await this.postRepository.save(newPost);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async deletePost({ userId, postId }): Promise<StatusResponse> {
    try {
      await this.postRepository.delete({
        id: postId,
        user: { id: userId },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  // Preference

  async getPostPreferenceByUserIdAndPostId({
    postId,
    userId,
  }: RequestPostPreferenceDto): Promise<PostPreference> {
    return await this.postPreferenceRepository.findOne({
      where: {
        post: postId,
        user: userId,
      },
      select: ['id'],
    });
  }

  async createPostPreference(
    createPostPreferenceDto: RequestPostPreferenceDto,
  ): Promise<StatusResponse> {
    try {
      const postPreferenceIsExist =
        !!(await this.getPostPreferenceByUserIdAndPostId(
          createPostPreferenceDto,
        ));
      if (!postPreferenceIsExist) {
        const { userId, postId } = createPostPreferenceDto;
        const newPostPreference = await this.postPreferenceRepository.create({
          user: { id: userId },
          post: { id: postId },
        });
        await this.postPreferenceRepository.save(newPostPreference);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async deletePostPreference(
    deletePostPreferenceDto: RequestPostPreferenceDto,
  ): Promise<StatusResponse> {
    try {
      const id = (
        await this.getPostPreferenceByUserIdAndPostId(deletePostPreferenceDto)
      )?.id;
      if (id) {
        await this.postPreferenceRepository.delete({ id });
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }
}

import { Post } from '../entity/post.entity';

export interface PostIncludePreference extends Post {
  preference?: number;
}

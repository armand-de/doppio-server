import { Post } from '../entity/post.entity';

export interface PostResponse extends Post {
  preference?: number;
}

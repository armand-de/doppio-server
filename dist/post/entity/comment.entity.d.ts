import { Post } from '../../post/entity/post.entity';
import { User } from '../../user/entity/user.entity';
export declare class Comment {
    id: string;
    contents: string;
    user: User;
    post: Post;
    createdDate: Date;
    updatedDate: Date;
}

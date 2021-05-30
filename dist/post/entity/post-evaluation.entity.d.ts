import { User } from '../../user/entity/user.entity';
import { Post } from './post.entity';
export declare class PostEvaluation {
    id: string;
    method: 1 | -1;
    user: User;
    post: Post;
    createdDate: Date;
    updatedDate: Date;
}

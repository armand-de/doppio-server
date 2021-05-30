import { User } from '../../user/entity/user.entity';
import { Comment } from './comment.entity';
import { PostEvaluation } from './post-evaluation.entity';
export declare class Post {
    id: string;
    title: string;
    contents: string;
    comments: Comment[];
    post_evaluations: PostEvaluation[];
    user: User;
    createdDate: Date;
    updatedDate: Date;
}

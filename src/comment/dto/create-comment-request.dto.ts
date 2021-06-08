import { IsString, IsUUID } from 'class-validator';

export class CreateCommentRequestDto {
  @IsUUID()
  postId: string;

  @IsString()
  contents: string;
}

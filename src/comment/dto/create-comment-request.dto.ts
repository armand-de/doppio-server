import { IsNumber, IsString } from 'class-validator';

export class CreateCommentRequestDto {
  @IsNumber()
  postId: number;

  @IsString()
  contents: string;
}

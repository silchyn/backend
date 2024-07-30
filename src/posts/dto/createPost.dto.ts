import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Title' })
  readonly title: string;

  @ApiProperty({ example: 'Lorem ipsum' })
  readonly content: string;

  @ApiProperty({ example: '1' })
  readonly userId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  @IsString({ message: 'Should be a string' })
  readonly value: string;

  @ApiProperty({ example: '1' })
  @IsNumber(undefined, { message: 'Should be a number' })
  readonly userId: number;
}

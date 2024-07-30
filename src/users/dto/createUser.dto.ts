import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@company.com' })
  @IsString({ message: 'Should be a string' })
  @IsEmail(undefined, { message: 'Should be an email' })
  readonly email: string;

  @ApiProperty({ example: '12345678' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 16, { message: 'Should be between 4 and 16 characters' })
  readonly password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator' })
  readonly description: string;
}

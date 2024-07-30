import { ApiProperty } from '@nestjs/swagger';
import { BelongsToManyAddAssociationMixin } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/post.model';
import { Role } from 'src/roles/role.model';
import { UserRole } from 'src/roles/userRole.model';

interface CreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users', underscored: true })
export class User extends Model<User, CreationAttributes> {
  @ApiProperty({ example: '1' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'user@company.com' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'Malicious content' })
  @Column({ type: DataType.STRING })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];

  declare addRole: BelongsToManyAddAssociationMixin<Role, Role['id']>;
}

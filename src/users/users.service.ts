import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/addRole.dto';
import { BanUserDto } from './dto/banUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('USER');

    if (role) {
      await user.addRole(role);

      user.roles = [role];
    }

    return user;
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll({ include: { all: true } });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole({ userId, value }: AddRoleDto): Promise<User> {
    const user = await this.usersRepository.findByPk(userId);
    const role = await this.rolesService.getRoleByValue(value);

    if (!user || !role) {
      throw new NotFoundException('No such user or role');
    }

    await user.addRole(role);

    return user;
  }

  async banUser({ userId, reason }: BanUserDto): Promise<User> {
    const [, [user]] = await this.usersRepository.update(
      { banned: true, banReason: reason },
      { where: { id: userId }, returning: true },
    );

    if (!user) {
      throw new NotFoundException('No such user');
    }

    return user;
  }
}

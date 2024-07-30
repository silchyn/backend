import { Injectable } from '@nestjs/common';
import { Role } from './role.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  createRole(dto: CreateRoleDto): Promise<Role> {
    return this.rolesRepository.create(dto);
  }

  getRoleByValue(value: string): Promise<Role | null> {
    return this.rolesRepository.findOne({ where: { value } });
  }
}

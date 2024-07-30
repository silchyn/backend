import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/createRole.dto';
import { Role } from './role.model';
import { permittedRoles } from '../auth/permittedRoles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @permittedRoles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Get(':value')
  getByValue(@Param('value') value: string): Promise<Role | null> {
    return this.rolesService.getRoleByValue(value);
  }
}

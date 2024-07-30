import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { permittedRoles } from 'src/auth/permittedRoles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/addRole.dto';
import { BanUserDto } from './dto/banUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @permittedRoles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @permittedRoles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Add role for user' })
  @ApiResponse({ status: 200, type: User })
  @permittedRoles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() dto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: User })
  @permittedRoles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  ban(@Body() dto: BanUserDto): Promise<User> {
    return this.usersService.banUser(dto);
  }
}

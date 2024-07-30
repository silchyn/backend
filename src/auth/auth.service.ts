import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthTokenDto } from './dto/authToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto): Promise<AuthTokenDto> {
    const user = await this.validateUser(dto);

    return { token: this.generateToken(user) };
  }

  async register(dto: CreateUserDto): Promise<AuthTokenDto> {
    let user = await this.usersService.getUserByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User with such email already exists');
    }

    user = await this.usersService.createUser({
      ...dto,
      password: await hash(dto.password, 5),
    });

    return { token: this.generateToken(user) };
  }

  private generateToken({ id, email, roles }: User): string {
    return this.jwtService.sign({ id, email, roles });
  }

  private async validateUser(dto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const isPasswordCorrect = await compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return user;
  }
}

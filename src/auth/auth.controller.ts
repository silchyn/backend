import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/authToken.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, type: AuthTokenDto })
  @Post('login')
  login(@Body() dto: CreateUserDto): Promise<AuthTokenDto> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, type: AuthTokenDto })
  @Post('registration')
  register(@Body() dto: CreateUserDto): Promise<AuthTokenDto> {
    return this.authService.register(dto);
  }
}

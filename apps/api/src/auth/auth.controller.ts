import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: UserLoginDto,@Req() req) {
    return this.authService.signIn(dto,req);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }
}

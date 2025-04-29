import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/product/common/zodValidationPipe';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, CreateUserSchema } from './dto/user.dto';
import { UserLoginDto, UserLoginSchema } from './dto/user.login.dto';
import { Roles } from '../roles/decorator';
import { Role } from '../roles/enum';
import { RoleGuard } from '../roles/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(UserLoginSchema))
  login(@Body() dto: UserLoginDto, @Req() req) {
    return this.authService.signIn(dto, req);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  register(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get('me')
  me(@Headers('authorization') authToken: string) {
    const token = authToken.split(' ')[1];

    return this.authService.me(token);
  }
}

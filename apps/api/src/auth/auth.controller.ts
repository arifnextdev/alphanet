import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/product/common/zodValidationPipe';
import { AuthService } from './auth.service';
import { CreateUserDto, CreateUserSchema } from './dto/user.dto';
import { UserLoginDto, UserLoginSchema } from './dto/user.login.dto';
import { Roles } from '../roles/decorator';
import { Role } from '../roles/enum';
import { RoleGuard } from '../roles/guards';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

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

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get('me')
  me(@Req() req: Request) {
    return this.authService.me(
      req.user as {
        userId: string;
        email: string;
        roles: string[];
        status: string;
      },
    );
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    const jwt = await this.authService.socialLogin(req.user);
    console.log(jwt);
    res.redirect(`http://localhost:3000/oauth-callback?token=${jwt}`);
  }
}

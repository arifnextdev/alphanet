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
  UnauthorizedException,
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
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(UserLoginSchema))
  login(@Body() dto: UserLoginDto, @Req() req: Request) {
    return this.authService.signIn(dto, req);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  register(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @UseGuards(AuthGuard('jwt'))
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

  @Post('refresh-token')
  refresh(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');
    return this.authService.refreshTokens(refreshToken);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    const jwt = await this.authService.socialLogin(req.user, 'GOOGLE');
    console.log(jwt);
    res.redirect(
      `http://localhost:3000/oauth-callback?token=${jwt.accessToken}`,
    );
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookRedirect(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    const jwt = await this.authService.socialLogin(req.user, 'FACEBOOK');
    console.log(jwt);
    res.redirect(
      `http://localhost:3000/oauth-callback?token=${jwt.accessToken}`,
    );
  }
}

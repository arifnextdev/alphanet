import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const username = this.generateUniqueUserName(dto.name || '', dto.email);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashPassword,
        name: dto.name,
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        roles: true,
        status: true,
      },
    });

    return user;
  }

  async signIn(dto: UserLoginDto, req: Request) {
    // const requestIp =
    //   (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    //   req.socket.remoteAddress ||
    //   req.connection.remoteAddress;

    // const allowedRanges = ['103.250.70.', '103.251.247.', '103.251.245.'];

    // const isAllowedIp = allowedRanges.some((range) =>
    //   requestIp?.startsWith(range),
    // );

    // if (!isAllowedIp) {
    //   throw new UnauthorizedException('You are not allowed to access');
    // }

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.provider !== 'CREDENTIAL') {
      throw new UnauthorizedException('You are not allowed to access');
    }

    if (user.status !== 'ACTIVE') {
      await this.prisma.loginHistory.create({
        data: {
          userId: user.id,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          attempt: 'FAILED',
        },
      });
      throw new UnauthorizedException('User is not active');
    }

    const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      await this.prisma.loginHistory.create({
        data: {
          userId: user.id,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          attempt: 'FAILED',
        },
      });
      throw new UnauthorizedException('Password is incorrect');
    }

    await this.prisma.loginHistory.create({
      data: {
        userId: user.id,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        attempt: 'SUCCESS',
      },
    });

    return this.generateTokens(user.id, user.email, user.roles, user.status);
  }

  async socialLogin(
    googleUser: any,
    provider: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, name, picture } = googleUser;

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          avatar: picture,
          provider: provider === 'google' ? 'GOOGLE' : 'FACEBOOK',
          username: this.generateUniqueUserName(name, email),
        },
      });
    }

    return this.generateTokens(user.id, user.email, user.roles, user.status);
  }

  async me(user: {
    userId: string;
    email: string;
    roles: string[];
    status: string;
  }) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        roles: true,
        status: true,
      },
    });

    if (!existUser || existUser.status !== 'ACTIVE') {
      throw new UnauthorizedException('User is not active');
    }

    return existUser;
  }

  async refreshTokens(refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user.id, user.email, user.roles, user.status);
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
      },
    });

    return { message: 'Logged out successfully' };
  }

  private async generateTokens(
    userId: string,
    email: string,
    roles: string[],
    status: string,
  ) {
    const payload = { userId, email, roles, status };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = randomBytes(64).toString('hex');

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateUniqueUserName(name: string, email: string) {
    return `${email.split('@')[0]}_${new Date().getMilliseconds()}_${name
      .split(' ')[0]
      .slice(0, 2)}`;
  }
}

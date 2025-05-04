import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/user.login.dto';

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

    const username = this.#generateUniqueUserName(dto.name, dto.email);

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
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status !== 'ACTIVE') {
      await this.prisma.loginHistory.create({
        data: {
          userId: user?.id,
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
          userId: user?.id,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          attempt: 'FAILED',
        },
      });
      throw new UnauthorizedException('Password is incorrect');
    }

    //Updated login history
    await this.prisma.loginHistory.create({
      data: {
        userId: user?.id,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        attempt: 'SUCCESS',
      },
    });

    return this.#generateToken({
      userId: user.id,
      email: user.email,
      roles: user.roles,
      status: user.status,
    });
  }

  async me(payload: string) {
    const token = await this.#VerifyToken(payload);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: token['userId'],
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

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User is not active');
    }

    return user;
  }

  #generateToken(payload: {
    userId: string;
    email: string;
    roles: string[];
    status: string;
  }) {
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }

  #VerifyToken(payload: string) {
    try {
      const token = this.jwtService.verify(payload);

      if (!token) {
        throw new UnauthorizedException('Invalid token');
      }

      console.log(token);
      return token;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  #generateUniqueUserName(name, email) {
    //total 10 characters use first name, id last 3 characters and first 3 characters of email and new date last 3

    return `${email.split('@')[0]}_${new Date().getMilliseconds()}_${name
      .split(' ')[0]
      .slice(0, 2)}`;
  }
}

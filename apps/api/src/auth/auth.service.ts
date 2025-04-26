import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { Request } from 'express';
import { UserLoginDto } from './dto/user.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        name: dto.name,
        avatar: dto.avatar,
        roles: dto.roles,
        status: dto.status,
      },
      select: {
        password: false,
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

    if (user.password !== dto.password) {
      await this.prisma.loginHistory.create({
        data: {
          userId: user?.id,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          //TODOS ADD STATUS
        },
      });
      throw new Error('Password is incorrect');
    }

    await this.prisma.loginHistory.create({
      data: {
        userId: user?.id,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        //TODOS ADD STATUS
      },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      status: user.status,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}

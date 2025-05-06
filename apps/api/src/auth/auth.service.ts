//auth service
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

    return this.generateToken({
      userId: user.id,
      email: user.email,
      roles: user.roles,
      status: user.status,
    });
  }

  async socialLogin(googleUser: any): Promise<string> {
    const { email, name, picture } = googleUser;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Register new user
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          avatar: picture,
          provider: 'GOOGLE', // optional
          username: this.generateUniqueUserName(name, email),
        },
      });

      return this.generateToken({
        userId: user.id,
        email: user.email,
        roles: user.roles,
        status: user.status,
      });
    }

    // Generate JWT

    return this.generateToken({
      userId: user.id,
      email: user.email,
      roles: user.roles,
      status: user.status,
    });
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

    if (!existUser || existUser?.status !== 'ACTIVE') {
      throw new UnauthorizedException('User is not active');
    }

    return {
      user: existUser,
    };
  }

  private generateToken(payload: {
    userId: string;
    email: string;
    roles: string[];
    status: string;
  }) {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  private VerifyToken(payload: string) {
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

  private generateUniqueUserName(name: string, email: string) {
    return `${email.split('@')[0]}_${new Date().getMilliseconds()}_${name.split(' ')[0].slice(0, 2)}`;
  }
}

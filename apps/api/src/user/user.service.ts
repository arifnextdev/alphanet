import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //Get all user
  async getAllUser() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        roles: true,
        status: true,
      },
    });

    return users;
  }

  // Get a Single User by ID
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
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

    if (user.roles.includes(Role.ADMIN)) {
      return user;
    }

    if (
      user.status !== UserStatus.ACTIVE &&
      user.status !== UserStatus.INACTIVE
    ) {
      throw new NotFoundException('User Status is not active');
    }

    return user;
  }

  //Update a User by ID
  async updateUser(id: string, data: any) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  //Delete a User by ID
  async updateUserStatus(id: string, status: UserStatus) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
}

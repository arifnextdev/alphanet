import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from 'src/auth/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { userUpdateSchema } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //Get all user
  async getAllUser({
    page = 1,
    limit = 10,
    status,
    role,
    search,
  }: {
    page?: number;
    limit?: number;
    status?: string;
    role?: string;
    search?: string;
  }) {
    const skip = (page - 1) * limit;

    const where: any = {
      ...(status && { status }),
      ...(role && { roles: { has: role } }), // for array roles
      ...(search && {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [users, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          provider: true,
          roles: true,
          status: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      users,
      pagination: {
        currentPage: page,
        perPage: limit,
        totalUsers: totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null,
      },
    };
  }

  // Get a Single User by ID
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        roles: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userInfo: true,
        orders: {
          select: {
            id: true,
            domainName: true,
            amount: true,
            paidAt: true,
            expiresAt: true,
            status: true,
            product: { select: { name: true, type: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            amount: true,
            status: true,
            subtotal: true,
            paidAt: true,
            method: true,
            currency: true,
        },
      },
      loginHistories: true,
    },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  //Update a User by ID
  async updateUser(id: string, data: UpdateUserDto) {
    const parsebody = userUpdateSchema.safeParse(data);
    if (!parsebody.success) {
      throw new Error('Invalid data format');
    }

    const updateUser = await this.prisma.user.findUnique({ where: { id } });
    if (!updateUser) {
      throw new NotFoundException('User not found');
    }

    console.log('Parsed Data:', parsebody.data);

    await this.prisma.user.update({
      where: { id },
      data: {
        name: parsebody.data.name,
        phone: parsebody.data.phone,
        userInfo: {
          update: {
            street: parsebody.data.street,
            city: parsebody.data.city,
            state: parsebody.data.state,
            country: parsebody.data.country,
            postalCode: parsebody.data.postalCode,
          },
        },
      },
    });

    // await this.prisma.userInfo.upsert({
    //   where: { userId: id },
    //   update: {

    //   },
    //   create: {
    //     userId: id,
    //     street: parsebody.data.street,
    //     city: parsebody.data.city,
    //     state: parsebody.data.state,
    //     country: parsebody.data.country,
    //     postalCode: parsebody.data.postalCode,
    //   },
    // });
    return { message: 'User updated successfully' };
  }

  //Delete a User by ID
  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  //Delete a User by ID
}

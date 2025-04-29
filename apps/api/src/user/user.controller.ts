import { AuthGuard } from './../auth/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { Roles } from 'src/roles/decorator';
import { Role } from 'src/roles/enum';
import { RoleGuard } from 'src/roles/guards';
import { CreateUserDto, UpdateUserDto } from 'src/auth/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(Role.CUSTOMER)
  @Get()
  getAllUser(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('role') role?: string,
    @Query('search') search?: string,
  ) {
    return this.userService.getAllUser({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      status,
      role,
      search,
    });
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(id, data);
  }
}

import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: any) {
    const result = await this.usersService.create(user);
    return {
      data: result,
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const result = await this.usersService.findOne(id);
    return {
      data: result,
    };
  }
}

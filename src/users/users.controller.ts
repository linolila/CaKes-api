import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userSevice: UsersService) {}
  @Get()
  getUser(): User[] {
    return this.userSevice.findAll();
  }
  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.userSevice.findById(Number(id));
  }
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userSevice.createUser(body);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userSevice.deleteUser(+id);
    return { message: `User with id ${id} has been deleted` };
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: CreateUserDto): User {
    return this.userSevice.updateUser(+id, body);
  }
}

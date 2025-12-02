import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userSevice: UsersService) {}
  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'role', required: false, type: String })
  getUser(@Query() filters: User) {
    return this.userSevice.findAll(filters);
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userSevice.findById(Number(id));
  }
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userSevice.createUser(body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userSevice.deleteUser(+id);
    return { message: `User with id ${id} has been deleted` };
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.userSevice.updateUser(+id, body);
  }
}

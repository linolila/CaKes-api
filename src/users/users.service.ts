import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.users;
  }
  findById(userId: number): User {
    const user = this.users.find((user: User) => user.id == userId);
    if (!user) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
  deleteUser(userId: number): void {
    const user = this.users.find((user: User) => user.id === userId);
    if (!user) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.users = this.users.filter((user: User) => user.id !== userId);
  }
  updateUser(userId: number, updateUserDto: CreateUserDto): User {
    const user = this.users.find((user: User) => user.id === userId);
    if (!user) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updateUser = { ...user, ...updateUserDto };
    this.users = this.users.map((user: User) =>
      user.id === userId ? updateUser : user,
    );
    return updateUser;
  }
}

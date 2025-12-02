// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { UserRole } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    // repository is an object that allows us to interact with the database table for the User entity.
    private readonly userRepository: Repository<User>,
  ) {}
  // private users: User[] = [];
  findAll(filters: User): Promise<User[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const where: FindOptionsWhere<User> = {};

    if (filters.name) {
      where.name = Like(`${filters.name}%`);
    }
    if (filters.email) {
      where.email = `${filters.email}%`;
    }
    if (filters.role) {
      where.role = filters.role;
    }
    return this.userRepository.find({ where });
  }
  findById(userId: number): Promise<User | null> {
    return this.userRepository.findOneBy({
      id: userId,
    } as FindOptionsWhere<User>);
  }
  // findAllOwners(): Promise<User[]> {
  //   return this.userRepository.find({ where: { role: UserRole.OWNER } });
  // }

  findAllCustomers(): Promise<User[]> {
    return this.userRepository.find({ where: { role: UserRole.CUSTOMER } });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role || UserRole.CUSTOMER;
    return this.userRepository.save(user);
  }
  deleteUser(userId: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(userId);
  }
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.role = updateUserDto.role || UserRole.CUSTOMER;
    user.id = id;
    return this.userRepository.save(user);
  }
}

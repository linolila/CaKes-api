import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty({ message: 'Name should not be empty.' })
  name: string;
  @IsEmail({}, { message: 'Please provide valid Email.' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @Matches(passwordRegex, {
    message:
      'Password must be 8-20 characters long, contain at least one letter, one number and one special character.',
  })
  password: string;
  role?: UserRole;
}

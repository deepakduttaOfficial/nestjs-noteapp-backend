import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUser {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @Length(4)
  password: string;
}

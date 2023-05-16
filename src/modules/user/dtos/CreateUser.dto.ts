import { IsNotEmpty, IsEmail, Length } from 'class-validator';
export class CreateUser {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @Length(4, 20)
  password: string;
}

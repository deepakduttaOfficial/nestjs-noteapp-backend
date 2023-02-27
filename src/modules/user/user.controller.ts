import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from './dtos/CreateUser.dto';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  SignUp(@Body() signupInfo: CreateUser) {
    return this.userService.createUser(signupInfo);
  }
}

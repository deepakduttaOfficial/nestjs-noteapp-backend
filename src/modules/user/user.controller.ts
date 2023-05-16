import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUser } from './dtos/CreateUser.dto';
import { LoginUser } from './dtos/Loginuser.dto';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  // Sign up
  @Post('signup')
  async SignUp(@Body() signupInfo: CreateUser) {
    const user = await this.userService.createUser(signupInfo);
    const { username } = user;
    return this.authService.login({ username, password: signupInfo.password });
  }

  // Sign in
  @Post('signin')
  Signin(@Body() signinInfo: LoginUser) {
    return this.authService.login(signinInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  Test(@Request() req) {
    return req.user;
  }
}

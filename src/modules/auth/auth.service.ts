import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginUser } from '../user/dtos/Loginuser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Validate user by email and password
  async validateUser(user: LoginUser): Promise<any> {
    try {
      const isUser = await this.prismaService.users.findUnique({
        where: { username: user.username },
      });

      if (!isUser) return null;
      // Compare password
      const isMatch = await bcrypt.compare(user.password, isUser.password);
      if (!isMatch) return null;
      isUser.password = undefined;
      return isUser;
    } catch (error) {
      console.log(error);
    }
  }

  // Login user and generate jwt token
  async login(user: LoginUser) {
    const validateUser = await this.validateUser(user);
    if (!validateUser)
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    const payload = {
      id: validateUser.id,
      name: validateUser.name,
      username: validateUser.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }
}

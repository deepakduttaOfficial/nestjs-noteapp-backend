import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpInterface } from 'src/utils/user.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Sign up logic
  async createUser(signupInfo) {
    try {
      // Destrucring signupInfo
      const { name, username, password } = signupInfo;
      // Check if user exist or not
      const isUserExist = await this.prisma.users.findUnique({
        where: { username: username } as Prisma.usersWhereUniqueInput,
      });
      if (isUserExist)
        throw new HttpException('User alreay exist', HttpStatus.CONFLICT);

      const newUser = await this.prisma.users.create({
        data: { name, password, username },
      });

      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async login(req) {
  //   return req.user;
  // }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

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

      // Hashing password
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      const newUser = await this.prisma.users.create({
        data: { name, password: hash, username },
      });

      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpInterface } from 'src/utils/user.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupInfo: SignUpInterface) {
    try {
      // Destrucring signupInfo
      const { name, email, password } = signupInfo;
      // Check if user exist or not
      const isUserExist = await this.prisma.users.findUnique({
        where: { email: email } as Prisma.usersWhereUniqueInput,
      });
      if (isUserExist)
        throw new HttpException('User alreay exist', HttpStatus.CONFLICT);

      // Create new user
      const newUser = await this.prisma.users.create({
        data: { name, email, password },
      });
      newUser.password = undefined;
      // Create a jwt token
      const authToken = jwt.sign({ id: newUser.id }, process.env.AUTH_TOKEN, {
        expiresIn: '1 day',
      });

      // Send this data to client
      const data = {
        newUser,
        authToken,
      };
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

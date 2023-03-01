import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { NoteModule } from './modules/note/note.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), AuthModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

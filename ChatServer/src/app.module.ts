import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { mongo_url } from '../keys/config.json';
import { MessageGateway } from './message/message.gateway';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(mongo_url)],
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})
export class AppModule {}

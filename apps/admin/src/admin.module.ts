import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

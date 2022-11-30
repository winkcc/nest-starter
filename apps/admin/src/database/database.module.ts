import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@libs/orm/entites/starter/user.entity';

@Global()
@Module({
  imports: [
    {
      ...TypeOrmModule.forFeature([UserEntity]),
      global: true,
    },
  ],
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}

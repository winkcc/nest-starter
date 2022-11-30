import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserEntity } from '@libs/orm/entites/starter/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  async getAllUser(): Promise<UserEntity[]> {
    return this.database.userRepo.find();
  }
}

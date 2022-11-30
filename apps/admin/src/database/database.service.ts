import { Global, Injectable } from '@nestjs/common';
import { UserEntity } from '@libs/orm/entites/starter/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepo: Repository<UserEntity>,
  ) {}
}

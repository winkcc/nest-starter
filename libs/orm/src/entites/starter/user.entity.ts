import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username: string;

  @Column()
  password: string;
}

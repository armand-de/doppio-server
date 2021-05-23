import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 8, unique: true, nullable: false })
  nickname: string;

  @Column({ length: 150, nullable: false })
  password: string;

  @Column({ length: 15, nullable: false, unique: true })
  phone: string;

  @Column({
    length: 200,
    nullable: true,
    default:
      'https://cdn.pixabay.com/photo/2014/11/27/12/24/coffee-547490_960_720.png'
  })
  image: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}

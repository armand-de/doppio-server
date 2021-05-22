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

  @Column({ length: 12, unique: true, nullable: false })
  nickname: string;

  @Column({ length: 150, nullable: false })
  password: string;

  @Column({ length: 25, nullable: false })
  phone: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}

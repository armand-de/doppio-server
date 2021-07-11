import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('verifies')
export class Verify {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15, nullable: false, unique: true })
  phone: string;

  @Column({ length: 6, nullable: false })
  verifyNumber: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}

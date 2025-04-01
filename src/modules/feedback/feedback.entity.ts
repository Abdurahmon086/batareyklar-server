import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_uz: string;

  @Column({ default: '' })
  title_ru: string;

  @Column({ default: '' })
  title_en: string;

  @Column()
  description_uz: string;

  @Column({ default: '' })
  description_ru: string;

  @Column({ default: '' })
  description_en: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

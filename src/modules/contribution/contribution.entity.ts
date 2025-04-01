import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Contribution {
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

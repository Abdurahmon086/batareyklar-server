import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subTitle_uz: string;

  @Column({ default: '' })
  subtitle_ru: string;

  @Column({ default: '' })
  subTitle_en: string;

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

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

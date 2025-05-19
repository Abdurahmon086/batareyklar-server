import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_uz: string;

  @Column({ default: '' })
  title_ru: string;

  @Column({ default: '' })
  title_en: string;

  @Column()
  count: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

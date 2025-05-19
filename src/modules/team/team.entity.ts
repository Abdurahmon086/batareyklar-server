import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_uz: string;

  @Column({ default: '' })
  name_ru: string;

  @Column({ default: '' })
  name_en: string;

  @Column()
  job_uz: string;

  @Column({ default: '' })
  job_ru: string;

  @Column({ default: '' })
  job_en: string;
  
  @Column({ default: '' })
  telegram: string;
  
  @Column({ default: '' })
  instagram: string;
  
  @Column({ default: '' })
  twitter: string;
  
  @Column({ default: '' })
  linkedin: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

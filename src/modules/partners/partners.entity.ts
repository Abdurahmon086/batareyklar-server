import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partners {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @Column()
  image: string;

  @Column({ default: true })
  isActive: boolean;
}

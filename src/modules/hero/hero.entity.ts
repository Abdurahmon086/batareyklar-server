import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  subTitle: string;
  
  @Column()
  title: string;
  
  @Column()
  description: string;
  
  @Column({ default: true })
  isActive: boolean;
}

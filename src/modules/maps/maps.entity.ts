import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Map {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city_value: string;

  @Column()
  title_uz: string;

  @Column({ default: '' })
  title_ru: string;

  @Column({ default: '' })
  title_en: string;

  @Column()
  adress_uz: string;

  @Column({ default: '' })
  adress_ru: string;

  @Column({ default: '' })
  adress_en: string;

  @Column({ default: '' })
  google_link: string;

  @Column({ default: '' })
  yandex_link: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

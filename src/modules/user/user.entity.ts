// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   username: string;

//   @Column({ default: '' })
//   email: string;

//   @Column()
//   phone: string;

//   @Column()
//   password: string;

//   @Column({ nullable: true })
//   image: string;

//   @Column({ default: false })
//   isAdmin: boolean;

//   @CreateDateColumn({ type: 'timestamp' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp' })
//   updatedAt: Date;
// }

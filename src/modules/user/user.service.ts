// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { IResponseInfo } from 'src/types';
// import { User } from './user.entity';
// import { deleteImage } from 'src/utils/upload-image';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async getAll(): Promise<IResponseInfo<User[]>> {
//     try {
//       const user = await this.userRepository.find();
//       return { status: 200, data: user, message: 'Success' };
//     } catch (error) {
//       return { status: 500, data: null, message: error.message };
//     }
//   }

//   async getOne(id: number): Promise<IResponseInfo<User>> {
//     try {
//       const user = await this.userRepository.findOneBy({ id });
//       if (!user) throw new NotFoundException(`user with id: ${id} not found`);
//       return { status: 200, data: user, message: 'Success' };
//     } catch (error) {
//       const status = error instanceof NotFoundException ? 404 : 500;
//       return { status, data: null, message: error.message };
//     }
//   }

//   async getByUsername(username: string): Promise<User | null> {
//     try {
//       const user = await this.userRepository.findOneBy({ username });
//       if (!user)
//         throw new NotFoundException(
//           `user with username: ${username} not found`,
//         );
//       return user;
//     } catch (error) {
//       return null;
//     }
//   }

//   async create(userData: Partial<User>): Promise<IResponseInfo<User>> {
//     try {
//       const user = await this.userRepository.save(
//         this.userRepository.create(userData),
//       );
//       return { status: 201, data: user, message: 'Created' };
//     } catch (error) {
//       return { status: 500, data: null, message: error.message };
//     }
//   }

//   async update(id: number, data: Partial<User>): Promise<IResponseInfo<User>> {
//     try {
//       const result = await this.getOne(id);
//       if (result.status !== 200) return result as IResponseInfo<User>;

//       if (result.data?.image) {
//         deleteImage(`/user/${result.data.image}`);
//       }

//       const updated = await this.userRepository.save({
//         ...result.data,
//         ...data,
//       });
//       return { status: 200, data: updated, message: 'Updated' };
//     } catch (error) {
//       return { status: 500, data: null, message: error.message };
//     }
//   }

//   async remove(id: number): Promise<IResponseInfo<boolean>> {
//     try {
//       const result = await this.getOne(id);
//       if (result.status !== 200) {
//         return { status: result.status, data: false, message: result.message };
//       }

//       if (result.data) {
//         deleteImage(`/user/${result.data.image}`);
//         await this.userRepository.remove(result.data);
//       }
//       return { status: 200, data: true, message: 'Deleted' };
//     } catch (error) {
//       return { status: 500, data: false, message: error.message };
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'userAdmin',
      password: '123admin',
    },
    {
      id: 2,
      username: 'john',
      password: '1234john',
    },
  ];

  async getByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

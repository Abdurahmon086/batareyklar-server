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
    try {
      const user = this.users.find((user) => user.username === username);

      if (!user) {
        throw new Error('user not found');
      }
      return user;
    } catch (error) {
      return `user not found -> ${error}`;
    }
  }
}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

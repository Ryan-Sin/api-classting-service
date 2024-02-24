import { Module } from '@nestjs/common';
import {MysqlModule} from "../databases/mysql.module";
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';

@Module({
  imports: [MysqlModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

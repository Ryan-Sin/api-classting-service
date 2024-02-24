import { Module } from '@nestjs/common';
import { MysqlProviders } from './mysql.providers';

@Module({
  providers: [...MysqlProviders],
  exports: [...MysqlProviders],
})
export class MysqlModule {}

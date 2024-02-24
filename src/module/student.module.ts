import { Module } from '@nestjs/common';
import { StudentController } from '../controller/student.controller';
import { StudentService } from '../service/student.service';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

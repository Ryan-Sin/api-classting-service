import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestLoggingMiddleware } from './utils/middleware/request-logging.middleware';
import { AuthModule } from './module/auth.module';
import { SchoolModule } from './module/school.module';
import { NewsFeedModule } from './module/news-feed.module';
import { StudentModule } from './module/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../src/config/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    AuthModule,
    SchoolModule,
    NewsFeedModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('');
  }
}

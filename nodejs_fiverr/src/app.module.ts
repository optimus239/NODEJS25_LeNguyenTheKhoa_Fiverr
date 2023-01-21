import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobCategoriesModule } from './job-categories/job-categories.module';
import { DetailJobCategoryModule } from './detail-job-category/detail-job-category.module';
import { JobModule } from './job/job.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    JobCategoriesModule,
    DetailJobCategoryModule,
    JobModule,
    HireJobModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

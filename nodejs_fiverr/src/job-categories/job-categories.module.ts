import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { JobCategoriesController } from './job-categories.controller';
import { JobCategoriesService } from './job-categories.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [JobCategoriesController],
  providers: [JobCategoriesService, JwtStrategy],
})
export class JobCategoriesModule {}

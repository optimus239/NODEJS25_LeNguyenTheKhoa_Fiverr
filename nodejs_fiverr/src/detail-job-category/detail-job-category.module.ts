import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { DetailJobCategoryController } from './detail-job-category.controller';
import { DetailJobCategoryService } from './detail-job-category.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [DetailJobCategoryController],
  providers: [DetailJobCategoryService, JwtStrategy],
})
export class DetailJobCategoryModule {}

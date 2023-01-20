import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [JobController],
  providers: [JobService, JwtStrategy],
})
export class JobModule {}

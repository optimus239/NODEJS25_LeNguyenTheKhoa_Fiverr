import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { HireJobController } from './hire-job.controller';
import { HireJobService } from './hire-job.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [HireJobController],
  providers: [HireJobService, JwtStrategy],
})
export class HireJobModule {}

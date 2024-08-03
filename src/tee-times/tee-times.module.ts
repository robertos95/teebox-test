import { Module } from '@nestjs/common';
import { GolfCourseModule } from '../golf-courses/golf-course.module';
import { TeeTimesController } from './tee-times.controller';
import { TeeTimesService } from './tee-times.service';

@Module({
  imports: [GolfCourseModule],
  controllers: [TeeTimesController],
  providers: [TeeTimesService],
})
export class TeeTimesModule {}

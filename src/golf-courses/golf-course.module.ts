import { Module } from '@nestjs/common';
import { GolfCourseServiceRegistry } from './golf-course.service.registry';

@Module({
  providers: [GolfCourseServiceRegistry],
  exports: [GolfCourseServiceRegistry],
})
export class GolfCourseModule {}

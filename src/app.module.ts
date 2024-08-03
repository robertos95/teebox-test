import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GolfCourseModule } from './golf-courses/golf-course.module';
import { TeeTimesModule } from './tee-times/tee-times.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GolfCourseModule,
    TeeTimesModule,
  ],
})
export class AppModule {}

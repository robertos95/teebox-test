import { Injectable } from '@nestjs/common';
import { GolfCourseService } from '../golf-courses/golf-course.abstract.service';
import { GolfCourseServiceRegistry } from '../golf-courses/golf-course.service.registry';
import { GetTeeTimesDto } from './dto/get-tee-times.dto';
import { TeeTime } from './interfaces/tee-time.interface';

@Injectable()
export class TeeTimesService {
  constructor(private readonly serviceRegistry: GolfCourseServiceRegistry) {}

  private getServicesBySiteIds(siteIds: string): GolfCourseService[] {
    return siteIds
      ? this.serviceRegistry.getServices(siteIds.split(',').map(Number))
      : this.serviceRegistry.getAllServices();
  }

  async getTeeTimes(getTeeTimesDto: GetTeeTimesDto): Promise<TeeTime[]> {
    const { siteIds, date, players } = getTeeTimesDto;

    const services = this.getServicesBySiteIds(siteIds);

    const teeTimesPromises = services.map(async (service) => {
      try {
        return await service.fetchTeeTimes(date, players);
      } catch (error) {
        console.log(
          `Failed to fetch tee times from service ${service.name}: ${error.message}`,
        );
        return []; // Return empty array if there's error from the site
      }
    });

    const teeTimesArrays = await Promise.all(teeTimesPromises);
    return teeTimesArrays.flat();
  }
}

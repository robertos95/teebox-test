import { Injectable } from '@nestjs/common';
import { GolfCourseServiceIds } from '../tee-times/enums/golf-course-service-id.enum';
import { IndianTreeService } from './club-prophets/indian-tree.service';
import { OldeCourseService } from './club-prophets/olde-course.service';
import { GolfCourseService } from './golf-course.abstract.service';

@Injectable()
export class GolfCourseServiceRegistry {
  private readonly services: {
    [key in GolfCourseServiceIds]: () => GolfCourseService;
  } = {
    [GolfCourseServiceIds.INDIAN_TREE]: () => new IndianTreeService(),
    [GolfCourseServiceIds.OLDE_COURSE]: () => new OldeCourseService(),
  };

  getService(serviceId: GolfCourseServiceIds): GolfCourseService {
    const serviceFactory = this.services[serviceId];
    if (!serviceFactory) {
      console.log(
        `Golf course service for site with ID "${serviceId}" is not found`,
      );
      return null;
    }
    return serviceFactory();
  }

  getServices(serviceIds: GolfCourseServiceIds[]): GolfCourseService[] {
    return serviceIds
      .map((serviceId) => this.getService(serviceId))
      .filter((service) => service !== null);
  }

  getAllServices(): GolfCourseService[] {
    return Object.values(this.services).map((serviceFactory) =>
      serviceFactory(),
    );
  }
}

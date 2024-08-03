import { Test, TestingModule } from '@nestjs/testing';
import { GolfCourseServiceIds } from '../tee-times/enums/golf-course-service-id.enum';
import { IndianTreeService } from './club-prophets/indian-tree.service';
import { OldeCourseService } from './club-prophets/olde-course.service';
import { GolfCourseServiceRegistry } from './golf-course.service.registry';

// Mock the services
jest.mock('./club-prophets/indian-tree.service');
jest.mock('./club-prophets/olde-course.service');

describe('GolfCourseServiceRegistry', () => {
  let registry: GolfCourseServiceRegistry;
  let indianTreeService: IndianTreeService;
  let oldeCourseService: OldeCourseService;

  beforeEach(async () => {
    // Mock implementations
    indianTreeService =
      new IndianTreeService() as jest.Mocked<IndianTreeService>;
    oldeCourseService =
      new OldeCourseService() as jest.Mocked<OldeCourseService>;

    // Create testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [GolfCourseServiceRegistry],
    }).compile();

    registry = module.get<GolfCourseServiceRegistry>(GolfCourseServiceRegistry);

    // Mock service factories
    (IndianTreeService as jest.Mock).mockImplementation(
      () => indianTreeService,
    );
    (OldeCourseService as jest.Mock).mockImplementation(
      () => oldeCourseService,
    );
  });

  it('should return the correct service for a valid service ID', () => {
    const service = registry.getService(GolfCourseServiceIds.INDIAN_TREE);
    expect(service).toBeInstanceOf(IndianTreeService);
  });

  it('should return null for a non-existent service ID', () => {
    console.log = jest.fn();

    const service = registry.getService(
      'non-existent-id' as unknown as GolfCourseServiceIds,
    );
    expect(service).toBeNull();
    // Verify logging for non-existent service
    expect(console.log).toHaveBeenCalledWith(
      'Golf course service for site with ID "non-existent-id" is not found',
    );
  });

  it('should return an array of services for valid service IDs', () => {
    const services = registry.getServices([
      GolfCourseServiceIds.INDIAN_TREE,
      GolfCourseServiceIds.OLDE_COURSE,
    ]);
    expect(services).toContain(indianTreeService);
    expect(services).toContain(oldeCourseService);
  });

  it('should return an empty array if no valid service IDs are provided', () => {
    const services = registry.getServices([
      'non-existent-id' as unknown as GolfCourseServiceIds,
    ]);
    expect(services).toEqual([]);
  });

  it('should return all registered services', () => {
    const services = registry.getAllServices();
    expect(services).toContain(indianTreeService);
    expect(services).toContain(oldeCourseService);
  });
});

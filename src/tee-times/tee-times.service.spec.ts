import { Test, TestingModule } from '@nestjs/testing';
import { GolfCourseService } from '../golf-courses/golf-course.abstract.service';
import { GolfCourseServiceRegistry } from '../golf-courses/golf-course.service.registry';
import { GetTeeTimesDto } from './dto/get-tee-times.dto';
import { TeeTimeDto } from './dto/tee-time.dto';
import { TeeTimesService } from './tee-times.service';

jest.mock('../golf-courses/golf-course.abstract.service');

describe('TeeTimesService', () => {
  let service: TeeTimesService;
  // let serviceRegistry: GolfCourseServiceRegistry;
  let mockGolfCourseService: GolfCourseService;

  beforeEach(async () => {
    mockGolfCourseService = {
      fetchTeeTimes: jest.fn(),
      name: 'MockService',
    } as unknown as GolfCourseService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeeTimesService,
        {
          provide: GolfCourseServiceRegistry,
          useValue: {
            getServices: jest.fn().mockResolvedValue([mockGolfCourseService]),
            getAllServices: jest
              .fn()
              .mockResolvedValue([mockGolfCourseService]),
          },
        },
      ],
    }).compile();

    service = module.get<TeeTimesService>(TeeTimesService);
    // serviceRegistry = module.get<GolfCourseServiceRegistry>(
    //   GolfCourseServiceRegistry,
    // );
  });

  it('should fetch and normalize tee times correctly', async () => {
    const dto: GetTeeTimesDto = {
      siteIds: '1',
      date: '2024-08-03',
      players: 1,
    };
    const mockTeeTimes: TeeTimeDto[] = [
      {
        courseId: '1',
        courseName: 'Mock Course',
        date: '2024-08-03',
        teeTimeStart: '08:00:00',
        price: 50,
        holes: 18,
        availableCount: 4,
        bookingURL: 'http://example.com',
      },
    ];

    mockGolfCourseService.fetchTeeTimes = jest
      .fn()
      .mockResolvedValue(mockTeeTimes);

    // Mock getServicesBySiteIds to return an array
    service['getServicesBySiteIds'] = jest
      .fn()
      .mockReturnValue([mockGolfCourseService]);

    const result = await service.getTeeTimes(dto);
    expect(result).toEqual(mockTeeTimes);
  });

  it('should handle errors during fetch and log appropriately', async () => {
    const dto: GetTeeTimesDto = {
      siteIds: '1',
      date: '2024-08-03',
      players: 1,
    };

    mockGolfCourseService.fetchTeeTimes = jest
      .fn()
      .mockRejectedValue(new Error('Fetch Error'));
    console.log = jest.fn();

    // Mock getServicesBySiteIds to return an array
    service['getServicesBySiteIds'] = jest
      .fn()
      .mockReturnValue([mockGolfCourseService]);

    const result = await service.getTeeTimes(dto);
    expect(result).toEqual([]);
    expect(console.log).toHaveBeenCalledWith(
      `Failed to fetch tee times from service ${mockGolfCourseService.name}: Fetch Error`,
    );
  });
});

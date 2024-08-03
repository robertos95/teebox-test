import { Test, TestingModule } from '@nestjs/testing';
import { GetTeeTimesDto } from './dto/get-tee-times.dto';
import { TeeTime } from './interfaces/tee-time.interface';
import { TeeTimesController } from './tee-times.controller';
import { TeeTimesService } from './tee-times.service';

// Mock TeeTimesService
jest.mock('./tee-times.service');

describe('TeeTimesController', () => {
  let controller: TeeTimesController;
  let service: TeeTimesService;

  beforeEach(async () => {
    service = new TeeTimesService(null) as jest.Mocked<TeeTimesService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeeTimesController],
      providers: [
        {
          provide: TeeTimesService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<TeeTimesController>(TeeTimesController);
  });

  it('should return tee times from the service', async () => {
    const dto: GetTeeTimesDto = {
      siteIds: '1',
      date: '2024-08-03',
      players: 1,
    };
    const mockTeeTimes: TeeTime[] = [
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

    service.getTeeTimes = jest.fn().mockResolvedValue(mockTeeTimes);

    const result = await controller.getTeeTimes(dto);
    expect(result).toEqual(mockTeeTimes);
  });
});

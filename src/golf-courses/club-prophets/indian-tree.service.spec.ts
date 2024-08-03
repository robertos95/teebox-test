import axios from 'axios';
import { TeeTimeDto } from '../../tee-times/dto/tee-time.dto';
import { IndianTreeService } from './indian-tree.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('IndianTreeService', () => {
  let service: IndianTreeService;

  beforeEach(() => {
    service = new IndianTreeService();
  });

  it('should fetch and normalize tee times correctly', async () => {
    // Mock response data
    const mockData = [
      {
        courseId: '1',
        startTime: '2024-08-03T08:00:00',
        shItemPrices: [
          {
            shItemCode: process.env.CLUB_PROPHET_ITEM_CODE_18_HOLES,
            taxInclusivePrice: 50,
          },
        ],
        maxPlayer: 4,
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockData });

    // Expected normalized tee times
    const expectedTeeTimes: TeeTimeDto[] = [
      {
        courseId: '1',
        courseName: 'Regulation 18',
        date: '2024-08-03',
        teeTimeStart: '08:00:00',
        price: 50,
        holes: 18,
        availableCount: 4,
        bookingURL: process.env.INDIAN_TREE_BASE_URL,
      },
    ];

    // Invoke fetchTeeTimes method
    const teeTimes = await service.fetchTeeTimes('2024-08-03', 1);

    // Assertions
    expect(mockedAxios.get).toHaveBeenCalledWith(
      process.env.INDIAN_TREE_BASE_URL +
        process.env.CLUB_PROPHET_TEE_TIMES_URL_PATH,
      {
        headers: {
          'X-Apikey': process.env.CLUB_PROPHET_DEFAULT_X_API_KEY,
          'X-Componentid': process.env.CLUB_PROPHET_DEFAULT_X_COMPONENT_ID,
          'X-Websiteid': process.env.CLUB_PROPHET_DEFAULT_X_WEBSITE_ID,
        },
        params: {
          searchDate: 'Sat Aug 03 2024',
          numberOfPlayer: 1,
          courseIds: '1',
          holes: 0,
          searchTimeType: 0,
          teeOffTimeMin: 0,
          teeOffTimeMax: 23,
          isChangeTeeOffTime: true,
          teeSheetSearchView: 5,
          classCode: 'R',
          defaultOnlineRate: 'N',
          isUseCapacityPricing: false,
          memberStoreId: 1,
          searchType: 1,
        },
      },
    );
    expect(teeTimes).toEqual(expectedTeeTimes);
  });

  it('should return an empty array if the fetch fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    console.log = jest.fn();

    const teeTimes = await service.fetchTeeTimes('2024-08-03', 1);

    expect(teeTimes).toEqual([]);
    expect(console.log).toHaveBeenCalledWith(
      `Failed to fetch tee times from ${process.env.INDIAN_TREE_NAME}: Error: Network Error`,
    );
  });
});

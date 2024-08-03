import axios from 'axios';
import { TeeTime } from '../../tee-times/interfaces/tee-time.interface';
import { GolfCourseService } from '../golf-course.abstract.service';

export abstract class ClubProphetService extends GolfCourseService {
  // comma separated list of course ids
  protected courses: Record<number, string>;

  constructor(name: string, config: ClubProphetConfig) {
    super(
      name,
      config.teeTimesUrl ??
        config.baseUrl + process.env.CLUB_PROPHET_TEE_TIMES_URL_PATH,
      config.baseUrl,
    );

    this.headers = {
      'X-Apikey': config.apiKey ?? process.env.CLUB_PROPHET_DEFAULT_X_API_KEY,
      'X-Componentid':
        config.componentId ?? process.env.CLUB_PROPHET_DEFAULT_X_COMPONENT_ID,
      'X-Websiteid':
        config.websiteId ?? process.env.CLUB_PROPHET_DEFAULT_X_WEBSITE_ID,
    };

    this.courses = config.courses;
    const courseIds = Object.keys(config.courses).join(',');
    this.baseParams = {
      courseIds,
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
      ...config.params,
    };
  }

  // Shared method for fetching tee times with CP-specific logic
  async fetchTeeTimes(date: string, players = 0): Promise<TeeTime[]> {
    const formattedDate = new Date(date).toDateString();

    const params = {
      searchDate: formattedDate,
      numberOfPlayer: players,
      ...this.baseParams,
    };

    try {
      const response = await axios.get(this.teeTimesUrl, {
        headers: this.headers,
        params,
      });

      return this.normalizeResponse(response.data);
    } catch (error) {
      console.log(`Failed to fetch tee times from ${this.name}: ${error}`);
      return [];
    }
  }

  protected normalizeResponse(data: any[]): TeeTime[] {
    const teeTimes: TeeTime[] = [];

    data.forEach((item) => {
      // Iterate over each item in shItemPrices to create a separate TeeTime entry
      if (item.shItemPrices && item.shItemPrices.length > 0) {
        item.shItemPrices.forEach((shItemPrice) => {
          // Assumption that GreenFee18 is 18 holes and GreenFee9 is 9 holes for all CP courses
          const holes =
            shItemPrice.shItemCode ===
            process.env.CLUB_PROPHET_ITEM_CODE_18_HOLES
              ? 18
              : 9;
          const splittedStartDateTime = item.startTime.split('T');
          const date = splittedStartDateTime[0];
          const startTime = splittedStartDateTime[1];
          teeTimes.push({
            courseId: item.courseId,
            courseName: this.courses[item.courseId],
            date: date,
            teeTimeStart: startTime,
            price: shItemPrice.taxInclusivePrice,
            holes: holes,
            availableCount: item.maxPlayer,
            bookingURL: this.bookingUrl,
          });
        });
      }
    });

    return teeTimes;
  }
}

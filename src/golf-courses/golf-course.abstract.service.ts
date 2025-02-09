import { TeeTimeDto } from '../tee-times/dto/tee-time.dto';

export abstract class GolfCourseService {
  public name: string;
  protected teeTimesUrl: string;
  protected bookingUrl: string;
  protected headers: Record<string, any>;
  protected baseParams: Record<string, any>;

  constructor(
    name: string,
    teeTimesUrl: string,
    bookingUrl: string,
    headers: Record<string, any> = {},
    baseParams: Record<string, any> = {},
  ) {
    this.name = name;
    this.teeTimesUrl = teeTimesUrl;
    this.bookingUrl = bookingUrl;
    this.headers = headers;
    this.baseParams = baseParams;
  }

  abstract fetchTeeTimes(date: string, players: number): Promise<TeeTimeDto[]>;

  protected abstract normalizeResponse(response: any): TeeTimeDto[];
}

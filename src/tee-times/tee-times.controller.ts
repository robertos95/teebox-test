import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { getSiteIdsEnumDescription } from '../util/helper';
import { GetTeeTimesDto } from './dto/get-tee-times.dto';
import { TeeTimeDto } from './dto/tee-time.dto';
import { GolfCourseServiceIds } from './enums/golf-course-service-id.enum';
import { TeeTimesService } from './tee-times.service';

@Controller('teeTimes')
export class TeeTimesController {
  constructor(private readonly teeTimesService: TeeTimesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get tee times',
    description:
      'Fetch tee times from golf course services on a specific date. It supports data fetching from an individual site or multiple sites.',
  })
  @ApiQuery({
    name: 'siteIds',
    required: false,
    example: '1,2',
    description: `Comma-separated list of golf course service IDs (unspecified = all sites).\n
    Available values:\n
    ${getSiteIdsEnumDescription(GolfCourseServiceIds)}`,
  })
  @ApiQuery({
    name: 'date',
    description: 'Date for fetching tee times, format YYYY-MM-DD',
    example: new Date().toISOString().split('T')[0],
    type: String,
  })
  @ApiQuery({
    name: 'players',
    required: false,
    example: '2',
    description: 'Number of players (unspecified = any number of players)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: [TeeTimeDto],
  })
  async getTeeTimes(@Query() query: GetTeeTimesDto): Promise<TeeTimeDto[]> {
    return this.teeTimesService.getTeeTimes(query);
  }
}

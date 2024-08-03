import { Controller, Get, Query } from '@nestjs/common';
import { GetTeeTimesDto } from './dto/get-tee-times.dto';
import { TeeTime } from './interfaces/tee-time.interface';
import { TeeTimesService } from './tee-times.service';

@Controller('teeTimes')
export class TeeTimesController {
  constructor(private readonly teeTimesService: TeeTimesService) {}

  @Get()
  async getTeeTimes(@Query() query: GetTeeTimesDto): Promise<TeeTime[]> {
    return this.teeTimesService.getTeeTimes(query);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TeeTimeDto {
  @ApiProperty({ example: '1', description: 'The ID of the golf course' })
  @IsString()
  courseId: string;

  @ApiProperty({
    example: 'Regulation 18',
    description: 'Name of the golf course',
  })
  @IsString()
  courseName: string;

  @ApiProperty({ example: '2024-08-03', description: 'Date for the tee time' })
  @IsString()
  date: string;

  @ApiProperty({
    example: '15:00:00',
    description: 'Start time of the tee time',
  })
  @IsString()
  teeTimeStart: string;

  @ApiProperty({ example: 50, description: 'Price of the tee time' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 18, description: 'Number of holes for the tee time' })
  @IsNumber()
  holes: number;

  @ApiProperty({
    example: 4,
    description: 'Number of available spots (max players)',
  })
  @IsNumber()
  availableCount: number;

  @ApiProperty({
    example: 'http://example.com/booking',
    description: 'Booking URL',
  })
  @IsString()
  bookingURL: string;
}

export interface TeeTime {
  courseId: string;
  courseName: string;
  date: string; // format: YYYY-MM-DD
  teeTimeStart: string; // format: HH:MM
  price: number;
  availableCount: number;
  bookingURL: string;
  holes: number;
}

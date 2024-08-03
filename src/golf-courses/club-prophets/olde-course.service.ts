import { ClubProphetService } from './club-prophet.abstract.service';

const courses = {
  '2': 'The Olde Course',
};

export class OldeCourseService extends ClubProphetService {
  constructor() {
    const config: ClubProphetConfig = {
      baseUrl: process.env.OLDE_COURSE_BASE_URL,
      courses,
    };

    super(process.env.OLDE_COURSE_NAME, config);
  }
}

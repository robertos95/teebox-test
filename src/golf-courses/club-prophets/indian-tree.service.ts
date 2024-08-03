import { ClubProphetService } from './club-prophet.abstract.service';

const courses = {
  '1': 'Regulation 18',
};

export class IndianTreeService extends ClubProphetService {
  constructor() {
    const config: ClubProphetConfig = {
      baseUrl: process.env.INDIAN_TREE_BASE_URL,
      courses,
    };

    super(process.env.INDIAN_TREE_NAME, config);
  }
}

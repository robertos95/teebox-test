// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ClubProphetConfig {
  teeTimesUrl?: string;
  baseUrl: string;
  courses: Record<string, any>;
  apiKey?: string;
  componentId?: number;
  websiteId?: string;
  // Only need to specify the one that is different / unspeficied in the base class
  params?: Record<string, any>;
}

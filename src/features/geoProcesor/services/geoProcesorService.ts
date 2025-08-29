import { httpService } from '@/src/lib/httpService';
import { Point } from '../types';

const GEO_PROCESOR_API_URL = '/api/geo-process';

export const geoProcesorService = {
  async processPoints(points: Point[]) {
    return httpService.post(GEO_PROCESOR_API_URL, { points });
  },
};

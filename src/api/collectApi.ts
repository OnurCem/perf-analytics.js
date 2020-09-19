import { makeRequest } from '../utils/httpUtil';
import { MetricModel } from '../models/MetricModels';

export const postMetric = (metricData: MetricModel[]): Promise<Response> =>
  makeRequest('/collect/metric', {
    method: 'POST',
    data: metricData,
  });

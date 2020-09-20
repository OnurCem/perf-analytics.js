import { postMetric } from '../api/collectApi';
import { MetricModel } from '../models/MetricModels';
import { MAX_RETRY_COUNT_ON_NETWORK_FAULT, REQUEST_RETRY_DELAY_TIME } from '../constants/metricConstants';

export const sendMetricsToServer = (metrics: MetricModel[], failedRequestCount: number): void => {
  postMetric(metrics).then(
    () => {
      // eslint-disable-next-line no-console
      console.log('Metrics sent successfully to server.');
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('Failed to send metrics, trying again...');

      if (failedRequestCount < MAX_RETRY_COUNT_ON_NETWORK_FAULT - 1) {
        setTimeout(() => {
          sendMetricsToServer(metrics, failedRequestCount + 1);
        }, REQUEST_RETRY_DELAY_TIME);
      }
    }
  );
};

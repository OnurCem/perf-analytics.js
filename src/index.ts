import { measureFCP } from './modules/fcp/measureFCP';
import { measureTTFB } from './modules/ttfb/measureTTFB';
import { measureDOMLoad } from './modules/dom-load/measureDOMLoad';
import { measureWindowLoad } from './modules/window-load/measureWindowLoad';
import { measureResourceTimings } from './modules/resource-timing/measureResourceTimings';
import { MetricModel } from './models/MetricModels';
import { postMetric } from './api/collectApi';
import { MAX_RETRY_COUNT_ON_NETWORK_FAULT, REQUEST_RETRY_DELAY_TIME } from './constants/metricConstants';

export const init = (): void => {
  const measurements = [measureFCP(), measureTTFB(), measureDOMLoad(), measureWindowLoad()];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-floating-promises
  Promise.allSettled(measurements).then((results: PromiseSettledResult<MetricModel>[]) => {
    const measureTime = new Date().toISOString();
    const successfulMeasurements = results.filter(({ status }) => status === 'fulfilled');
    const metrics = successfulMeasurements.map(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      ({ value }: PromiseFulfilledResult<MetricModel>): MetricModel => ({
        ...value,
        measureTime,
      })
    );

    let failedRequestCount = 0;

    const sendMetricsToServer = () => {
      postMetric(metrics).then(
        () => {
          // eslint-disable-next-line no-console
          console.log('Metrics sent successfully to server.');

          failedRequestCount = 0;
        },
        () => {
          // eslint-disable-next-line no-console
          console.log('Failed to send metrics, trying again...');

          failedRequestCount += 1;

          if (failedRequestCount < MAX_RETRY_COUNT_ON_NETWORK_FAULT) {
            setTimeout(sendMetricsToServer, REQUEST_RETRY_DELAY_TIME);
          }
        }
      );
    };

    sendMetricsToServer();
  });

  measureResourceTimings();
};

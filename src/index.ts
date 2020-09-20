import { measureFCP } from './modules/fcp/measureFCP';
import { measureTTFB } from './modules/ttfb/measureTTFB';
import { measureDOMLoad } from './modules/dom-load/measureDOMLoad';
import { measureWindowLoad } from './modules/window-load/measureWindowLoad';
import { measureResourceTimings } from './modules/resource-timing/measureResourceTimings';
import { MetricModel } from './models/MetricModels';
import { sendMetricsToServer } from './utils/sendMetricsToServer';

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

    sendMetricsToServer(metrics, 0);
  });

  measureResourceTimings();
};

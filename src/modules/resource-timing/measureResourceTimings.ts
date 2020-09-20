import { sendMetricsToServer } from '../../utils/sendMetricsToServer';
import { METRIC_NAMES, TRACKED_RESOURCE_INITIATOR_TYPES } from '../../constants/metricConstants';

export const measureResourceTimings = (): void => {
  try {
    const performanceObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(({ initiatorType, name, duration }: PerformanceResourceTiming) => {
        if (TRACKED_RESOURCE_INITIATOR_TYPES.includes(initiatorType)) {
          sendMetricsToServer(
            [
              {
                metricName: METRIC_NAMES.RESOURCE,
                duration,
                measureTime: new Date().toISOString(),
                resourceName: name,
              },
            ],
            0
          );
        }
      });
    });

    performanceObserver.observe({
      type: 'resource',
      buffered: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

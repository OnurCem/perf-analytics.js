import { MetricModel } from '../../models/MetricModels';
import { METRIC_NAMES } from '../../constants/metricConstants';

export const measureFCP = (): Promise<MetricModel> =>
  new Promise((resolve, reject) => {
    try {
      const performanceObserver = new PerformanceObserver((entryList, po) => {
        entryList.getEntries().forEach(({ name, startTime }) => {
          if (name === 'first-contentful-paint') {
            po.disconnect();

            resolve({
              metricName: METRIC_NAMES.FCP,
              duration: parseInt(startTime.toFixed(0), 10),
            });
          }
        });
      });

      performanceObserver.observe({
        type: 'paint',
        buffered: true,
      });
    } catch (e) {
      reject(e);
    }
  });

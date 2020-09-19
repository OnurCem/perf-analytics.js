import { afterPageLoad } from '../../utils/afterPageLoad';
import { MetricModel } from '../../models/MetricModels';
import { METRIC_NAMES } from '../../constants/metricConstants';

export const measureTTFB = (): Promise<MetricModel> =>
  new Promise<MetricModel>((resolve, reject) => {
    try {
      afterPageLoad(() => {
        const { timing } = window.performance;

        resolve({
          metricName: METRIC_NAMES.TTFB,
          duration: timing.responseStart - timing.navigationStart,
        });
      });
    } catch (e) {
      reject(e);
    }
  });

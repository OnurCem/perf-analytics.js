import { afterPageLoad } from '../../utils/afterPageLoad';
import { MetricModel } from '../../models/MetricModels';
import { METRIC_NAMES } from '../../constants/metricConstants';

export const measureDOMLoad = (): Promise<MetricModel> =>
  new Promise((resolve, reject) => {
    try {
      afterPageLoad(() => {
        const { timing } = window.performance;

        resolve({
          metricName: METRIC_NAMES.DOM_LOAD,
          duration: timing.domContentLoadedEventEnd - timing.navigationStart,
        });
      });
    } catch (e) {
      reject(e);
    }
  });

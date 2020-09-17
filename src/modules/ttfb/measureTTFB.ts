import { afterPageLoad } from '../../utils/afterPageLoad';

export const measureTTFB = (): void => {
  try {
    afterPageLoad(() => {
      const { timing } = window.performance;

      // eslint-disable-next-line no-console
      console.log('TTFB', timing.responseStart - timing.navigationStart);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

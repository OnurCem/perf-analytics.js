import { afterPageLoad } from '../../utils/afterPageLoad';

export const measureWindowLoad = (): void => {
  try {
    afterPageLoad(() => {
      const { timing } = window.performance;

      // eslint-disable-next-line no-console
      console.log('Window Load', timing.loadEventEnd - timing.navigationStart);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

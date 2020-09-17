import { afterPageLoad } from '../../utils/afterPageLoad';

export const measureDOMLoad = (): void => {
  try {
    afterPageLoad(() => {
      const { timing } = window.performance;

      // eslint-disable-next-line no-console
      console.log('DOM Load', timing.domContentLoadedEventEnd - timing.navigationStart);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

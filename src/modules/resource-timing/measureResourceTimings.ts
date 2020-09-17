export const measureResourceTimings = (): void => {
  try {
    const performanceObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(({ name, duration }) => {
        // eslint-disable-next-line no-console
        console.log('Resource', name, duration);
      });
    });

    performanceObserver.observe({
      type: 'resource',
      buffered: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

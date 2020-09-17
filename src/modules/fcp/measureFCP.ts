export const measureFCP = (): void => {
  try {
    const performanceObserver = new PerformanceObserver((entryList, po) => {
      entryList.getEntries().forEach(({ name, startTime }) => {
        if (name === 'first-contentful-paint') {
          po.disconnect();

          // eslint-disable-next-line no-console
          console.log('FCP', startTime);
        }
      });
    });

    performanceObserver.observe({
      type: 'paint',
      buffered: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

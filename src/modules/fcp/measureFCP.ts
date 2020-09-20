import { MetricModel } from '../../models/MetricModels';
import { METRIC_NAMES } from '../../constants/metricConstants';

const rAF = window.requestAnimationFrame;

// https://github.com/vigneshshanmugam/first-contentful-paint/blob/master/src/first-contentful-paint.js
const fcpPolyfill = (callback: (number) => void): void => {
  let isImage = false;

  const isImageCompleted = (imageNode: HTMLImageElement) => {
    if (imageNode.complete && imageNode.offsetHeight > 0) {
      callback(performance.now());
    } else {
      rAF(() => isImageCompleted(imageNode));
    }
  };

  const iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ALL, {
    acceptNode(node: Node): number {
      if (!node) {
        return NodeFilter.FILTER_REJECT;
      }

      const isNonEmptyTextNode = node.nodeType === Node.TEXT_NODE && /[^s]/.test(node.nodeValue.trim());

      if (isNonEmptyTextNode && node.parentElement.offsetHeight > 0) {
        return NodeFilter.FILTER_ACCEPT;
      }

      const isContentfulImage = node instanceof HTMLImageElement && node.src !== '';

      if (isContentfulImage) {
        isImage = true;
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_REJECT;
    },
  });

  const currentNode = iterator.nextNode();

  if (currentNode) {
    if (isImage) {
      rAF(() => isImageCompleted(currentNode as HTMLImageElement));
    } else {
      rAF(() => {
        callback(performance.now());
      });
    }
  } else {
    rAF(() => fcpPolyfill(callback));
  }
};

export const measureFCP = (): Promise<MetricModel> =>
  new Promise((resolve, reject) => {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes('paint')) {
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
      } else {
        // eslint-disable-next-line no-console
        console.log('Paint Timing API not supported!');

        rAF(() => {
          fcpPolyfill((duration: number) => {
            resolve({
              metricName: METRIC_NAMES.FCP,
              duration: parseInt(duration.toFixed(0), 10),
            });
          });
        });
      }
    } catch (e) {
      reject(e);
    }
  });

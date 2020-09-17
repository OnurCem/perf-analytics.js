import { measureFCP } from './modules/fcp/measureFCP';
import { measureTTFB } from './modules/ttfb/measureTTFB';
import { measureDOMLoad } from './modules/dom-load/measureDOMLoad';
import { measureWindowLoad } from './modules/window-load/measureWindowLoad';
import { measureResourceTimings } from './modules/resource-timing/measureResourceTimings';

export const init = (apiKey: string): void => {
  // eslint-disable-next-line no-console
  console.log('Initialized with API key:', apiKey);

  measureFCP();
  measureTTFB();
  measureDOMLoad();
  measureWindowLoad();
  measureResourceTimings();
};

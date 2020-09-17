// https://github.com/GoogleChrome/web-vitals/blob/master/src/getTTFB.ts#L69
export const afterPageLoad = (callback: () => void): void => {
  if (document.readyState === 'complete') {
    // Queue a task so the callback runs after `loadEventEnd`.
    setTimeout(callback, 0);
  } else {
    // Use `pageshow` so the callback runs after `loadEventEnd`.
    window.addEventListener('pageshow', callback);
  }
};

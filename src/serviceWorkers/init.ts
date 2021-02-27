if ('serviceWorker' in navigator && !WEBPACK_DEV_SERVER) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

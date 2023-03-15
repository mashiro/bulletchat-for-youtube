(function () {
  'use strict';

  (async () => {
    if ("assets/content-script-preamble.js.js")
      await import(
        /* @vite-ignore */
        chrome.runtime.getURL("assets/content-script-preamble.js.js")
      );
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("vendor/vite-client.mjs.js")
    );
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("src/content.tsx.js")
    );
  })().catch(console.error);

})();

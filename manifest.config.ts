import { defineManifest } from '@crxjs/vite-plugin'

export const manifest = defineManifest({
  manifest_version: 3,
  name: 'Bulletchat for YouTube',
  version: '2.0.0',
  author: 'mashiro',
  // permissions: ['storage', 'tabs', 'https://www.youtube.com/*'],
  action: {
    default_popup: 'index.html#options',
  },
  content_scripts: [
    {
      js: ['src/content.tsx'],
      matches: ['https://www.google.com/*'],
    },
  ],
})

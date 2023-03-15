import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Bulletchat for YouTube',
  version: '2.0.0',
  author: 'mashiro',
  permissions: ['storage', 'tabs', 'https://www.youtube.com/*'],
  action: {
    default_popup: 'index.html#options',
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
})

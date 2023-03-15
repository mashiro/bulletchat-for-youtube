import { defineConfig } from 'vite'

import { manifest } from './manifest.config'

import { crx } from '@crxjs/vite-plugin'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
})

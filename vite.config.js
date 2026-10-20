import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // three.js makes the single bundle ~770 kB (≈207 kB gzipped); that's expected.
  build: { chunkSizeWarningLimit: 900 },
})

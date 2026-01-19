import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/disc-test/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'router-vendor': ['react-router-dom'],
        }
      }
    }
  }
})

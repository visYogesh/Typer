import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// fallback to localhost:4000 if VITE_API_BASE is not defined
const API_BASE = process.env.VITE_API_BASE || 'http://localhost:4000'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_BASE,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

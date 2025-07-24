import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/upload': 'http://localhost:8000',
      '/query': 'http://localhost:8000',
      '/metadata': 'http://localhost:8000',
      // keep '/api' if you want, but not needed for your current backend
    }
  }
})

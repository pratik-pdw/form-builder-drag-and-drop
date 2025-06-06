import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/form-builder-drag-and-drop/',
  plugins: [react()],
})

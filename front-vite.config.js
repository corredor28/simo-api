import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/empleos': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
      '/tipoprocesoseleccion': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
      '/convocatorias': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
      '/entidades': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
      '/departamento': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
      '/municipio': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
      '/niveles': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
      '/tipodiscapacidad': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

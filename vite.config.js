import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Site statique déployable tel quel (Netlify, Vercel, GitHub Pages, OVH...).
// base './' pour marcher aussi bien à la racine du domaine que dans un sous-dossier.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5180, open: true }
})

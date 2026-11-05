import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`         → site + espace admin (Netlify)
// `npm run build:single`  → page publique en un seul fichier HTML (aperçu / démo client)
export default defineConfig(({ mode }) =>
  mode === 'single'
    ? { plugins: [react(), viteSingleFile()], build: { outDir: 'dist-single' } }
    : {
        plugins: [react()],
        build: {
          rollupOptions: {
            input: { main: resolve(__dirname, 'index.html'), admin: resolve(__dirname, 'admin.html') },
          },
        },
      },
)

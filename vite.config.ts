/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, so assets need that prefix. Local
  // dev and any root-domain host use '/', selected by the DEPLOY_BASE env var in CI.
  base: process.env['DEPLOY_BASE'] ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    // Vite's default binds to IPv6 loopback only, so http://127.0.0.1:5173 is
    // refused when the browser resolves `localhost` to IPv4. Binding to all
    // interfaces makes both loopback families work — and also exposes the dev
    // server on the local network, which is what lets you open it on a phone to
    // check the mobile layout. Change to '127.0.0.1' if you'd rather it stayed
    // private to this machine.
    host: true,
    // Fail loudly instead of silently moving to 5174 when the port is taken.
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/')
          if (normalizedId.includes('/node_modules/')) {
            if (
              normalizedId.includes('three') ||
              normalizedId.includes('@react-three')
            ) {
              return 'three-vendor'
            }
            if (
              normalizedId.includes('katex') ||
              normalizedId.includes('uplot')
            ) {
              return 'math-vendor'
            }
            if (normalizedId.includes('@supabase')) {
              return 'supabase-vendor'
            }
            if (
              normalizedId.includes('/react/') ||
              normalizedId.includes('/react-dom/') ||
              normalizedId.includes('/react-router/') ||
              normalizedId.includes('/react-router-dom/') ||
              normalizedId.includes('/zustand/') ||
              normalizedId.includes('/scheduler/')
            ) {
              return 'react-vendor'
            }
          }
          if (normalizedId.includes('/content/lessons/0625/')) {
            return 'content-physics-0625'
          }
          if (normalizedId.includes('/content/lessons/0620/')) {
            return 'content-chemistry-0620'
          }
          if (normalizedId.includes('/content/lessons/0610/')) {
            return 'content-biology-0610'
          }
          if (normalizedId.includes('/content/syllabus/')) {
            return 'syllabus-data'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1100,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})

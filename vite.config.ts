import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true, // Generate source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Lazy load Three.js components - only load when needed
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          // GSAP for animations
          if (id.includes('gsap')) {
            return 'gsap-vendor';
          }
          // React and router
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor';
          }
        },
      },
      // Minify unused exports
      treeshake: {
        moduleSideEffects: false,
      },
    },
    // Optimize chunk size warning threshold
    chunkSizeWarningLimit: 600,
  },
  // Optimize dependencies during dev for faster rebuilds
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true, // Generate source maps for debugging
    cssCodeSplit: true, // Split CSS into separate chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Lazy load Three.js components - only load when needed
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          // GSAP ScrollTrigger separately (only used in scroll animations)
          if (id.includes('gsap/ScrollTrigger') || id.includes('ScrollTrigger')) {
            return 'gsap-scroll';
          }
          // GSAP core for animations
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
    chunkSizeWarningLimit: 500, // Lower threshold for better chunk control
    // Reduce JavaScript execution time
    target: 'es2020', // Use modern JS for better optimization
  },
  // Optimize dependencies during dev for faster rebuilds
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: false, // Only optimize when needed
  },
})

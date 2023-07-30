import { defineConfig } from 'vite'
import path from 'path'
import { createVitePlugins } from './build/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  base: '/zl-lowCode/',
  build: {
    outDir: 'docs'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: ['.js', '.json', '.ts', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`
      }
    }
  }
})

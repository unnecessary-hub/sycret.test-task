import preact                   from '@preact/preset-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig }         from 'vite'
import tsconfigPaths            from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/sycret.test-task',
  plugins: [preact(), vanillaExtractPlugin(), tsconfigPaths()],
  server: {
    port: 3000
  },
  define: {
    'process.env': process.env
  }
})

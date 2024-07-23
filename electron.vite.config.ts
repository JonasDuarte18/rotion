import path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

const tsconfigPaths = tsconfigPathsPlugin({
  projects: [path.resolve('tsconfig.json')],
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
    publicDir: path.resolve('resources'),
    resolve: {
      alias: {
        '@shared': path.resolve('src/shared'),
      },
    },
  },
  preload: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': path.resolve('src/shared'),
      },
    },
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@renderer': path.resolve('src/renderer/src'),
        '@shared': path.resolve('src/shared'),
      },
    },
    plugins: [tsconfigPaths, react()],
  },
})

import path from 'path'

import { defineConfig } from '@rsbuild/core'

import mkcert from '../src'

export default defineConfig({
  plugins: [
    mkcert({
      source: 'coding',
      savePath: path.resolve(process.cwd(), 'node_modules/.mkcert')
    })
  ],
  source: {
    entry: { index: 'playground/main.ts' }
  },
  html: {
    template: 'playground/index.html'
  },
  tools: {
    rspack: {
      context: path.resolve('playground')
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'landing.html'),
        menu: resolve(__dirname, 'menu.html'),
        array: resolve(__dirname, 'array.html'),
        linkedList: resolve(__dirname, 'linked_list.html'),
        stack: resolve(__dirname, 'stack.html'),
        queue: resolve(__dirname, 'queue.html'),
        binaryTree: resolve(__dirname, 'binarytree.html'),
        bst: resolve(__dirname, 'bst.html'),
        about: resolve(__dirname, 'about.html'),
      }
    }
  },
  server: {
    port: 5173,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import { PROXY_URL } from './vite.config.dev';

export default defineConfig({
  plugins: [
    react(),

    createStyleImportPlugin({
      libs: [
        {
          esModule: true,
          libraryName: 'antd',
          resolveStyle: (name: string) => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890FF',
        },
      },
    },
  },

  // 别名
  resolve: {
    alias: { '@': '/src' },
  },

  // 代理
  server: {
    host: '0.0.0.0',
    proxy: {
      '/rpc': {
        target: PROXY_URL,
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.jsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'gt/tm',
        match: ['http://localhost:63342/gt-tm/index.html**','http://localhost/**'],
      },
      // build: {
      //   externalGlobals: {
      //     react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
      //     'react-dom': cdn.jsdelivr(
      //       'ReactDOM',
      //       'umd/react-dom.production.min.js',
      //     ),
      //   },
      // },
    }),
  ],
});
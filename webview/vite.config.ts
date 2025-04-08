// webview/vite.config.ts
import react from '@vitejs/plugin-react';
import path from 'path';

export default {
  plugins: [react()],
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    'process.browser': true,
    // Ensure compatibility with React 18
    "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE": JSON.stringify(false)
  },
  build: {
    outDir: '../dist/webview',
    emptyOutDir: true,
    sourcemap: true,
    // Change from lib to regular application format
    lib: undefined,
    minify: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.tsx'),
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // Ensure CSS is extracted correctly
    cssCodeSplit: false
  },
  css: {
    // Enable PostCSS processing
    postcss: true,
    // Generate a source map for easier debugging
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'digramaatic_ui': path.resolve(__dirname, '.yalc/digramaatic_ui/src/index.ts')
    },
    preserveSymlinks: true
  }
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './.yalc/digramaatic_ui/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'node-fill': 'var(--node-fill)',
        'node-stroke': 'var(--node-stroke)',
        'edge-stroke': 'var(--edge-stroke)',
        'background': 'var(--background-color)',
        'text': 'var(--text-color)'
      }
    },
  },
  plugins: [],
} 
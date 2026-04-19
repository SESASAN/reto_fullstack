import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#111319',

        surface: '#111319',
        'surface-dim': '#111319',
        'surface-bright': '#373940',
        'surface-variant': '#33343b',

        'surface-container-lowest': '#0c0e14',
        'surface-container-low': '#191b22',
        'surface-container': '#1e1f26',
        'surface-container-high': '#282a30',
        'surface-container-highest': '#33343b',

        primary: '#c7bfff',
        'primary-container': '#8e7fff',
        'inverse-primary': '#5a46d3',

        secondary: '#c4c6d3',
        'secondary-container': '#444652',

        tertiary: '#c3c5db',
        'tertiary-container': '#8d8fa4',

        outline: '#928ea0',
        'outline-variant': '#474554',

        error: '#ffb4ab',
        'error-container': '#93000a',

        'on-background': '#e2e2eb',
        'on-surface': '#e2e2eb',
        'on-surface-variant': '#c9c4d7',
        'on-primary': '#2b009e',
        'on-primary-container': '#25008c',
        'on-secondary': '#2d303b',
        'on-secondary-container': '#b2b4c2',
        'on-tertiary': '#2c2f41',
        'on-tertiary-container': '#26293a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
      },
      fontFamily: {
        headline: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        label: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'obsidian-nav': '0 20px 40px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'obsidian-hero':
          'radial-gradient(circle at 30% 50%, rgba(142, 127, 255, 0.15) 0%, rgba(199, 191, 255, 0.08) 50%, transparent 100%)',
        'obsidian-primary': 'linear-gradient(135deg, #c7bfff 0%, #8e7fff 100%)',
      },
    },
  },
  plugins: [forms, containerQueries],
}

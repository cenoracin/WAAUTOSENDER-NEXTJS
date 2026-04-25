import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#25D366',
        secondary: '#128C7E',
        dark: '#111B21',
        light: '#F0F2F5',
        success: '#31A24C',
        danger: '#E74C3C',
        warning: '#F39C12',
        info: '#3498DB',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config

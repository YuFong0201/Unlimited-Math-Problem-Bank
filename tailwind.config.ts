import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neu: {
          base: '#E0E5EC',
          text: '#3D4852',
          muted: '#6B7280',
          primary: '#6C63FF',
          success: '#38B2AC',
        }
      },
      boxShadow: {
        'neu-extruded': '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)',
        'neu-hover': '12px 12px 20px rgba(163,177,198,0.7), -12px -12px 20px rgba(255,255,255,0.6)',
        'neu-inset': 'inset 6px 6px 10px rgba(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)',
        'neu-inset-deep': 'inset 10px 10px 20px rgba(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)',
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-dm)', 'sans-serif'],
        'mono-clean': ['var(--font-noto-mono)', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
export default config
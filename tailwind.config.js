/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-background)',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-background)',
          'bg-secundary': 'var(--color-secondary)',
          'bg-base-foreground': 'var(--color-text-base)',
          'bg-fill-default': 'var(--color-fill)',
          'button-accent': 'var(--color-button-accent)',
          'button-accent-hover': 'var(--color-button-accent-hover)',
          'button-muted': 'var(--color-button-muted)',
        },
      },
      gradientColorStops: {
        skin: {
          hue: 'var(--color-fill)',
        },
      },
      borderColor: {
        skin: {
          'bg-muted': 'var(--color-text-muted)',
        },
      },
      fontFamily: {
        skin: ['Gabarito'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
}

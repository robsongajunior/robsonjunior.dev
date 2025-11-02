// import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        dracula: {
          // Background & UI Colors
          background: '#282A36',
          current: '#44475A',
          selection: '#44475A',
          foreground: '#F8F8F2',
          comment: '#6272A4',

          // Accent Colors
          cyan: '#8BE9FD',
          green: '#50FA7B',
          orange: '#FFB86C',
          pink: '#FF79C6',
          purple: '#BD93F9',
          red: '#FF5555',
          yellow: '#F1FA8C',

          // ANSI Normal Colors
          ansiBlack: '#21222C',

          // ANSI Bright Colors
          ansiBrightBlack: '#6272A4',
          ansiBrightRed: '#FF6E6E',
          ansiBrightGreen: '#69FF94',
          ansiBrightYellow: '#FFFFA5',
          ansiBrightBlue: '#D6ACFF',
          ansiBrightMagenta: '#FF92DF',
          ansiBrightCyan: '#A4FFFF',
          ansiBrightWhite: '#FFFFFF'
        }
      }
    }
  },
  plugins: []
}

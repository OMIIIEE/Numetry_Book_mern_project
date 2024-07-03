/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add your source files here
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#5AB2FF',
      },
      fontFamily: {
        'comforter': ['Comforter Brush', 'cursive'],
        'abril': ['"Abril Fatface"', 'cursive'],
        'pacifico':['Pacifico', 'cursive'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
}


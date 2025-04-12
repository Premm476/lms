/** @type {import('tailwindcss').Config} */
/* eslint-env node */
/* globals module, require */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#1E1E2D',
        'dark-secondary': '#2D2D42',
        'dark-accent': '#4B4B7C',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
  corePlugins: {
    // Disable preflight if needed for existing CSS
    // preflight: false,
  },
}

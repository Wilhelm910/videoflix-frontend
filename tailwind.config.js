/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Benenne deine Schriftart
      },
      screens: {
        'xl-1500': '1500px', // Neuer Breakpoint bei 1500px
      },
    },
  },
  plugins: [],
};

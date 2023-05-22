/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', "sans-serif"],
        cursive: ['"McLaren"', "cursive"],
      },
      colors: {
        lightBorder: "#EFEFEF",
        orange: "#FF9F41",
        blue: "#3EB8D4",
        black: "#1C1C1C",
        white: "#FFFFFF",
        "border-gray-300": "#33333",
        lightBlue: "#DCF8FF",
        grey: "#737373",
        red: "#FF5341",
        transparent: "#f2f2f200",
        lightRed: "#FFDFDC",
      },
      // Define the `.right-arrow` and `.left-arrow` classes
    },
  },
  plugins: [],
  // Add your custom CSS styles using the `@layer` directive
  // in the `style` property of the `plugins` object
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      yellow: "#F5FF7D",
      background: "#FFFFFF",
      black: "#000000",
      white: "#FFFFFF",
      "border-gray-300": "#33333",
      red: "#f72500",
      grey: "#D9D9D9",
      green: "#D9D9D9",
      transparent: "#f2f2f200",
      greyDark: "#787878",
    },
    fontFamily: {
      sans: ['"Questrial"', "sans-serif"],
      cursive: ['"McLaren"', "cursive"],
    },
    extend: {
      // Define the `.right-arrow` and `.left-arrow` classes
    },
  },
  plugins: [],
  // Add your custom CSS styles using the `@layer` directive
  // in the `style` property of the `plugins` object
};

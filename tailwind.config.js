/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkText: "#000000",
        skyText: "#3232ff",
        themeRed: "#fc0808",
      },
    },
  },
  plugins: [],
};

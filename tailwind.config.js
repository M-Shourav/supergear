/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkText: "#000000",
        skyText: "#32bde8",
        themeRed: "#fc0808",
        whiteText: "#fff",
        lightText: "#9b9b9b",
        greenText: "#1d8221",
      },
    },
  },
  plugins: [],
};

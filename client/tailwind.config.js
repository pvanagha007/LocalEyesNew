/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#41521F",      // Deep Forest Green
        olive: "#A89F68",      // Muted Olive Beige
        peach: "#F5C396",      // Warm Peachy Beige
        sand: "#D0B17A",       // Sand Brown
        softyellow: "#F5FDC6", // Soft Light Yellow
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"], // headings/logo
        body: ["Open Sans", "sans-serif"],     // body text
      },
      boxShadow: {
        card: "0 10px 20px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

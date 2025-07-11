/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        sidebar: "#1f1f1f",
        panel: "#2a2a2a",
        accent: "#7c3aed",
        text: "#ffffff",
        grayText: "#9ca3af"
      }
    },
  },
  plugins: [],
}

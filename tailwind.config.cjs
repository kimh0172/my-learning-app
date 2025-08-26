/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        brand: { 500: "#6366F1", 600: "#4F46E5", 700: "#4338CA" },
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(2,6,23,0.15)",
        card: "0 1px 0 0 rgba(2,6,23,0.06), 0 6px 16px -8px rgba(2,6,23,0.12)",
      },
      borderRadius: { "2xl": "1.25rem" },
    },
  },
  plugins: [],
};

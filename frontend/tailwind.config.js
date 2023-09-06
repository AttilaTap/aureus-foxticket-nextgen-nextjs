/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header-bg": "url('/public/background-img/bg-image-one.jpg')",
      },
      backgroundColor: {
        'modern-gray': '#E0E2E6',
        'custom-gray': 'rgb(74, 85, 104)',
      },
    },
  },
  plugins: [],
};

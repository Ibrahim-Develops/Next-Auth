/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", // Ensure it scans your project files
    ],
    theme: {
      extend: {},
    },
    plugins: [require("tailwindcss-animate")], // Ensure this is included
  };
  
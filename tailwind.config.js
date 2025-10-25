export default {
  darkMode: "class", // 
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-light-blue": "#d0ebff",
        "my-dark-gray": "#1a1a1a",
      },
    },
  },
  plugins: [],
};

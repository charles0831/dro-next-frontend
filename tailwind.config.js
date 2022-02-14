const appConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"),
    require("postcss"),
    require("autoprefixer"),
  ],
  theme: {
    extend: {},
  },
  // plugins: [
  //   require("postcss-import"),
  //   require("tailwindcss"),
  //   require("autoprefixer"),
  // ],
};

module.exports = appConfig;

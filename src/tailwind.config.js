module.exports = {
  content: [
    "src/index.html",
    "src/_includes/*",
    "src/docs/*",
    "src/tutorials/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#59cd12",
          secondary: "#1ed3a0",
          accent: "#9cdb2f",
          neutral: "#2f3132",
          "base-100": "#ffffff",
        },
      },
      "dark",
    ],
  },
}

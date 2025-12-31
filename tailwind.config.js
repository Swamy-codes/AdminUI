export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [
    {
      pattern:
        /bg-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|blue|indigo|purple|pink|rose)-500/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

import legacy from "@vitejs/plugin-legacy";

export default {
  plugins: [
    legacy({
      targets: [">0%", "not dead"],
    }),
  ],
};

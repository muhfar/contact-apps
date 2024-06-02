// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  overrides: [
    {
      files: ["*.tsx", "ts"],
      parserOptions: {
        project: "./tsconfig.json"
      }
    }
  ]
};

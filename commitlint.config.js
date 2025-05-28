export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Custom rules if needed
    "scope-enum": [
      2,
      "always",
      [
        "core",
        "components",
        "utils",
        "demo",
        "test",
        "deps",
        "build",
        "docs",
        "ci",
      ],
    ],
  },
};

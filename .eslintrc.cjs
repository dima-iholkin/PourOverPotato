/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "perfectionist"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"]
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    }
  ],
  "rules": {
    // Sort the HTML attributes:
    "perfectionist/sort-svelte-attributes": [
      "warn",
      {
        "type": "alphabetical",
        "order": "asc",
        "groups": [
          "multiline",
          "unknown",
          ["shorthand", "svelte-shorthand"]
        ]
      }
    ],
    "svelte/sort-attributes": "off",
    // Semi-colons:
    "semi": "warn",
    // Tune the default rules:
    "@typescript-eslint/no-unused-vars": "warn",
    "prefer-const": "warn",
    "no-debugger": "warn"
  }
};

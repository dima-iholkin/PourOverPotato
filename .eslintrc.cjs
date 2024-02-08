/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
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
    // Tune the default rules:
    "@typescript-eslint/no-unused-vars": "warn",
    "svelte/valid-compile": "warn", // Fixed the error on unused "data" prop from Svelte load function.
    "prefer-const": "warn",
    "no-debugger": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-empty": "warn",
    //
    // Sort everything:
    //
    // Sort imports:
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
        "pathGroups": [
          {
            "pattern": "svelte**",
            "group": "builtin",
            "position": "after"
          },
          {
            "pattern": "@sveltejs/kit**",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "$app/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "$lib/**",
            "group": "internal",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": [],
        "newlines-between": "never",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "import/no-unresolved": "off", // Disable because it shows false errors for "$lib" paths.
    //
    // Sort the HTML attributes:
    "perfectionist/sort-svelte-attributes": [
      "warn",
      {
        "type": "alphabetical",
        "ignore-case": true,
        "order": "asc",
        "groups": [
          "id",
          "slot",
          ["multiline", "unknown", "shorthand", "svelte-shorthand"],
          ["aria", "a11y"],
          "svelte-builtin"
        ],
        "custom-groups": {
          "id": "id",
          "slot": "slot",
          "aria": "aria*",
          "a11y": "alt",
          "svelte-builtin": "*:*"
        }
      }
    ],
    "svelte/sort-attributes": "off",
    // Sort the object properties:
    // "sort-keys": ["warn", "asc", { "caseSensitive": false, "natural": true, "minKeys": 2 }],
    //
    // Trailing commas:
    "comma-dangle": ["warn", "never"],
    //
    // Semi-colons:
    "semi": "warn",
    //
    // Double quotes:
    "quotes": "warn",
    //
    // Max line length at 120 chars:
    "max-len": [
      "warn",
      {
        "code": 120,
        "ignoreComments": false,
        "ignoreTrailingComments": false,
        "ignoreStrings": false,
        "ignoreTemplateLiterals": true
      }
    ]
  }
};

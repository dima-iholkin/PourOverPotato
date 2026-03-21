import prettier from "eslint-config-prettier";
import path from "node:path";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ts.configs.recommended,
    svelte.configs.recommended,
    prettier,
    svelte.configs.prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser, ...globals.node
            }
        },
        rules: {
            // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects:
            "no-undef": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-unused-expressions": "warn",
            "svelte/valid-compile": "warn",
            "svelte/prefer-svelte-reactivity": "warn",
            "svelte/no-navigation-without-resolve": "warn",
            "svelte/no-unused-props": "warn",
            "prefer-const": "warn",
            "no-debugger": "warn",
            "@typescript-eslint/ban-ts-comment": "off",
            "no-empty": "warn",
            "no-restricted-imports": ["warn", {
                "patterns": [{
                    "group": ["..*"],
                    "message": "Use an absolute path with '$lib' instead."
                }]
            }],
            /* "import/order": ["warn", {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
                "pathGroups": [{
                    "pattern": "svelte**",
                    "group": "builtin",
                    "position": "after",
                }, {
                    "pattern": "@sveltejs/kit**",
                    "group": "external",
                    "position": "before",
                }, {
                    "pattern": "$app/**",
                    "group": "external",
                    "position": "after",
                }, {
                    "pattern": "$lib/**",
                    "group": "internal",
                    "position": "before",
                }],
                "pathGroupsExcludedImportTypes": [],
                "newlines-between": "never",
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true,
                },
            }],
            "import/no-unresolved": "off", */
            /* "perfectionist/sort-svelte-attributes": ["warn", {
                "type": "alphabetical",
                "ignore-case": true,
                "order": "asc",
                "groups": [
                    "id",
                    "slot",
                    ["multiline", "unknown", "shorthand", "svelte-shorthand"],
                    ["aria", "a11y", "role"],
                    "svelte-builtin",
                ],
                "custom-groups": {
                    "id": "id",
                    "slot": "slot",
                    "aria": "aria*",
                    "a11y": "alt",
                    "role": "role",
                    "svelte-builtin": "*:*",
                },
            }], */
            "svelte/sort-attributes": "off",
            "comma-dangle": ["warn", "never"],
            "semi": "warn",
            "quotes": "warn",
            "max-len": ["warn", {
                "code": 120,
                "ignoreComments": false,
                "ignoreTrailingComments": false,
                "ignoreStrings": false,
                "ignoreTemplateLiterals": true
            }]
        }
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: [".svelte"],
                parser: ts.parser,
                svelteConfig
            }
        }
    }
);
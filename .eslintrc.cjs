/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "prettier",
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
          },
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
    // "sort-imports": [
    //   "warn",
    //   {
    //     "ignoreCase": true,
    //     "ignoreDeclarationSort": true,
    //     "ignoreMemberSort": false,
    //     "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
    //     "allowSeparatedGroups": false
    //   }
    // ],
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
          ["data-", "builtin-html-element", "builtin-element", "builtin-manual", "builtin-on-events"],
          ["multiline", "unknown", "shorthand", "svelte-shorthand"],
          ["aria", "a11y"]
        ],
        "custom-groups": {
          "id": "id",
          "slot": "slot",
          "data-": "data-**",
          // Discovered from here: console.log(Object.keys(HTMLElement.prototype));
          // eslint-disable-next-line max-len
          "builtin-html-element": "+(accessKey|attachInternals|attributeStyleMap|autocapitalize|autofocus|blur|click|contentEditable|dataset|dir|draggable|enterKeyHint|focus|hidden|hidePopover|inert|innerText|inputMode|isContentEditable|nonce|offsetHeight|offsetLeft|offsetParent|offsetTop|offsetWidth|outerText|popover|showPopover|spellcheck|style|tabIndex|title|togglePopover|translate|virtualKeyboardPolicy)",
          // I removed "lang" from the above rule.
          // Discovered from here: console.log(Object.keys(Element.prototype));
          // eslint-disable-next-line max-len
          "builtin-element": "+(after|animate|append|assignedSlot|attachShadow|attributes|before|checkVisibility|childElementCount|children|classList|className|clientHeight|clientLeft|clientTop|clientWidth|closest|computedStyleMap|elementTiming|firstElementChild|getAnimations|getAttribute|getAttributeNS|getAttributeNames|getAttributeNode|getAttributeNodeNS|getBoundingClientRect|getClientRects|getElementsByClassName|getElementsByTagName|getElementsByTagNameNS|getInnerHTML|hasAttribute|hasAttributeNS|hasAttributes|hasPointerCapture|id|innerHTML|insertAdjacentElement|insertAdjacentHTML|insertAdjacentText|lastElementChild|localName|matches|namespaceURI|nextElementSibling|outerHTML|part|prefix|prepend|previousElementSibling|querySelector|querySelectorAll|releasePointerCapture|remove|removeAttribute|removeAttributeNS|removeAttributeNode|replaceChildren|replaceWith|requestFullscreen|requestPointerLock|role|scroll|scrollBy|scrollHeight|scrollIntoView|scrollIntoViewIfNeeded|scrollLeft|scrollTo|scrollTop|scrollWidth|setAttribute|setAttributeNS|setAttributeNode|setAttributeNodeNS|setPointerCapture|shadowRoot|slot|tagName|toggleAttribute|webkitMatchesSelector|webkitRequestFullScreen|webkitRequestFullscreen)",
          // eslint-disable-next-line max-len
          "builtin-manual": "+(class|href|for|form|max|min|name|placeholder|step|src|type)", // figuring this out manually, logical OR
          "builtin-on-events": "on[a-z]*", // Starts with "on" and then it's only lowercase letters.
          "aria": "aria**",
          "a11y": "alt"
        }
      }
    ],
    "svelte/sort-attributes": "off",
    // Sort the object properties:
    // "sort-keys": ["warn", "asc", { "caseSensitive": false, "natural": true, "minKeys": 2 }],
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
    ],
  }
};

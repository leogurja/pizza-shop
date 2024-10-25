import jsPlugin from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["api/**/*.ts"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  jsPlugin.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
];

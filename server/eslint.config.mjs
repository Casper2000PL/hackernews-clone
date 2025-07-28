import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import eslintPrettierConfig from "eslint-config-prettier";
import drizzlePlugin from "eslint-plugin-drizzle";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, drizzle: fixupPluginRules(drizzlePlugin) },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    eslintPrettierConfig,
  },
]);

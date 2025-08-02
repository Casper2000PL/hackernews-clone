import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import drizzlePlugin from "eslint-plugin-drizzle";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  js.configs.recommended, // Base ESLint recommended rules
  prettier, // Prettier compatibility (must be last to override other configs)
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      drizzle: fixupPluginRules(drizzlePlugin),
    },
    languageOptions: {
      globals: globals.browser,
    },
    // Your custom rules here (if needed)
  },
]);

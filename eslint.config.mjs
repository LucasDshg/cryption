import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import testingLibrary from "eslint-plugin-testing-library";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["coverage/**/*", "**/*.html"]), {
    languageOptions: {
        globals: {
            ...globals.jest,
            ...globals.browser,
        },
    },
}, {
    files: ["**/*.ts"],

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended",
        "plugin:testing-library/angular",
        "prettier",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "testing-library": testingLibrary,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }],

        "no-console": ["error", {
            allow: ["warn", "error"],
        }],

        "no-unused-vars": "warn",
        "init-declarations": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@angular-eslint/no-input-rename": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "testing-library/no-debugging-utils": "off",

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowTypedFunctionExpressions: true,
        }],

        "@angular-eslint/no-host-metadata-property": ["off", {
            allowStatic: true,
        }],

        "@typescript-eslint/explicit-module-boundary-types": ["error", {
            allowArgumentsExplicitlyTypedAsAny: true,
        }],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "class",
            modifiers: ["exported"],
            format: ["PascalCase"],
        }, {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
        }, {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE"],
        }, {
            selector: "typeAlias",
            format: ["PascalCase"],
            prefix: ["T"],
        }, {
            selector: "interface",
            format: ["PascalCase"],
            prefix: ["I"],
        }, {
            selector: "enum",
            format: ["PascalCase"],
            prefix: ["E"],
        }],

        "@angular-eslint/component-class-suffix": ["error", {
            suffixes: ["Page", "Component"],
        }],

        "@angular-eslint/component-selector": ["error", {
            prefix: "app",
            style: "kebab-case",
            type: "element",
        }],

        "@angular-eslint/directive-selector": ["error", {
            prefix: "app",
            style: "kebab-case",
            type: "attribute",
        }],
    },
}, {
    files: ["**/*.html"],
    ignores: ["**/*inline-template-*.component.html"],

    extends: compat.extends(
        "plugin:prettier/recommended",
        "plugin:@angular-eslint/template/recommended",
    ),

    rules: {
        "prettier/prettier": ["error", {
            parser: "angular",
        }],
    },
}]);
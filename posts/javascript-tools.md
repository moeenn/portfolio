---
title: "Essential tools in Javascript"
desc: "Some tools are so useful they have before the defacto standard in the Javascript world. This article walks through their setup and usage."
category: "Javascript"
tags: ["Typescript"]
---

## Eslint

Eslint is a linter which can find potential errors and code smells in a Javascript / Typescript codebase.

### Installation

```bash
$ npm install -D eslint typescript-eslint
```

### Configuration

**Typescript project** config inside `eslint.config.js` file.

```js
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{ts,tsx}"] },
	...tseslint.configs.recommended,
	{
		rules: {
			"no-warning-comments": [
				"warn",
				{ terms: ["TODO", "FIXME"], location: "anywhere" },
			],
			"no-console": "warn",
			quotes: [
				"warn",
				"double",
				{
					allowTemplateLiterals: true,
					avoidEscape: true,
				},
			],
			semi: ["warn", "never"],
			"no-unused-vars": "warn",
		},
	},
];
```

```json
{
	"lint": "npx eslint --fix ./src/ --ext .ts"
}
```

**Plain Javascript project** config.

```json
{
  "scripts": {
    "lint": "npx eslint --fix ./src/ --ext .mjs"
  },
  ...
}
```

```js
import jsdoc from "eslint-plugin-jsdoc";

export default [
	{
		plugins: {
			jsdoc: jsdoc,
		},
		rules: {
			"jsdoc/check-values": "error",
			"no-console": "warn",
			quotes: [
				"warn",
				"double",
				{
					allowTemplateLiterals: true,
					avoidEscape: true,
				},
			],
			semi: ["warn", "never"],
			"no-unused-vars": "warn",
		},
	},
];
```

## Prettier

Prettier is the defactor code formatter for Javascript.

### Installation

```bash
$ npm install -D prettier
```

### Config

Configuration inside `package.json` file.

```json
{
  ...
  "prettier": {
    "singleQuote": false,
    "semi": false,
    "tabWidth": 4,
    "trailingComma": "all",
	"printWidth": 100
  },
  ...
}
```

```json
{
	"scripts": {
		"fmt": "npx prettier --write ./src/"
	}
}
```

## Vite

Vite is compiler for front-end assets and support a wide variety of front-end framewors.

### Installation

```bash
# create project
$ npm create vite@latest

# install dev dependencies
$ npm i -D @types/node
```

### Setting up Tailwind

```bash
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

Add the following directives to the main `css` file

```css
@tailwind tailwindcss;
```

### Setting up absolute imports

Add the following to the `vite.config.ts`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import process from "node:process";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": path.resolve(process.cwd(), "src"),
		},
	},
});
```

Add the following to the `tsconfig.json` file

```json
{
	"compilerOptions": {
		"baseUrl": "./src",
		"paths": {
			"@/*": ["./*"]
		}
	}
}
```

### Loading environment variables

```ts
// file: vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import process from "node:process";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [react()],
		server: {
			port: 5000,
		},
		resolve: {
			alias: {
				"@": path.resolve(process.cwd(), "src"),
			},
		},
	});
};
```

**Note**: Following rules apply for environment files

- `.env.development` will be loaded in development mode
- `.env.production` will be loaded in production mode
- `.env` will be loaded in all cases

All environment variables must be prefixed with `VITE_` for them be accessible inside front-end code. Example `.env.development` file may look something like this.

```
VITE_API_URL=http://localhost:3000
```

In order to access the environment variables inside the code, we can access them through the special `import.meta.env` object.

```js
console.log(import.meta.env.VITE_API_URL);
```

**Note**: The `.env.*` files will be not be included in the production output build. The environment variables will be inlined during build process.

## Typescript

Typescript is a typed super-set of Javascript. It can be configured by creating a `tsconfig.json` file at the root of the project.

```json
{
	"compilerOptions": {
		"target": "es2020",
		"module": "es2020",
		"allowJs": true,
		"removeComments": true,
		"resolveJsonModule": true,
		"typeRoots": ["./node_modules/@types"],
		"sourceMap": true,
		"outDir": "dist",
		"strict": true,
		"alwaysStrict": true,
		"lib": ["es2020"],
		"forceConsistentCasingInFileNames": true,
		"esModuleInterop": true,
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true,
		"moduleResolution": "Node",
		"skipLibCheck": true,
		"strictNullChecks": true,
		"noUncheckedIndexedAccess": true,
		"noImplicitAny": true,
		"noImplicitOverride": true,
		"noPropertyAccessFromIndexSignature": true,
		"exactOptionalPropertyTypes": true,
		"strictPropertyInitialization": true,
		"noImplicitThis": true,
		"strictBindCallApply": true,
		"noImplicitReturns": true,
		"noFallthroughCasesInSwitch": true,
		"allowUnreachableCode": false,
		"strictFunctionTypes": true,
		"isolatedModules": true,
		"baseUrl": "./src",
		"paths": {
			"@/*": ["./*"]
		}
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules", "**/node_modules/**"]
}
```

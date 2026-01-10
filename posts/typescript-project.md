---
title: "Setting up Typescript + NodeJS projects"
desc: "Typescript and NodeJS are very flexible technologies and there are myriad different ways of setting them up. This article presents way with least amount of external dependencies."
category: "Javascript"
tags: ["Node", "Typescript"]
---

## Setting up structure

As always, we create a new empty project using the following command.

```bash
# create package.json file.
$ npm init -y

# create src/ directory.
$ mkir ./src

# create entrypoint script.
$ touch ./src/main.ts
```

Next, we add our basic dependencies.

```bash
$ npm i -D @types/node esbuild typescript prettier eslint typescript-eslint
```

Looking at these dependencies, you may be wondering some things:
- Prettier and Eslint are mandatory for any project. They are often treated as optional but they are not.
- I like to bundle my application code into a single script file. That makes it easier to deploy. This is where Esbuild comes into play.


### Setup Typescript

We create a `tsconfig.json` file at the root of our project and add the following configuration.

```json
{
    "display": "Strictest",
    "compilerOptions": {
        "strict": true,
        "allowUnusedLabels": false,
        "allowUnreachableCode": false,
        "allowImportingTsExtensions": true,
        "moduleResolution": "node",
        "noEmit": true,
        "exactOptionalPropertyTypes": false,
        "noFallthroughCasesInSwitch": true,
        "noImplicitOverride": true,
        "noImplicitReturns": true,
        "noPropertyAccessFromIndexSignature": true,
        "noUncheckedIndexedAccess": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "isolatedModules": false,
        "checkJs": true,
        "esModuleInterop": true,
        "target": "ESNext",
        "module": "preserve",
        "verbatimModuleSyntax": true,
        "skipLibCheck": true,
        "types": [
            "node"
        ],
        "baseUrl": ".",
        "paths": {}
    },
    "exclude": [
        "node_modules",
        "build",
        "dist"
    ]
}
```


### Prettier and Eslint configurations

First, let's setup Prettier. All it really requires is some entries in our project's `package.json` file.

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

**Note**: Some people have strong opinions on semicolons in Javascript / Typescript. However, I have never run into problems when I omit them. Plus, the code looks slighly cleaner without them.

Next, we setup Eslint. The recent version require an actual config file. We create the `eslint.config.js` file at the root of the project and add the following configurations.

```js
import tseslint from "typescript-eslint"

export default [
    { files: ["**/*.ts"] },
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-console": "warn",
            "no-warning-comments": [
                "warn",
                { terms: ["TODO", "FIXME"], location: "anywhere" },
            ],
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
]
```


### Setting up absolute paths

Have you ever seen package imports which looks like this?

```ts
import { Function } from "../../../../../../../../fnpackage.ts"
```

Yuck. We can do better. Instead of always importing relative to our current package, we can import from root of projects. The above import could become as follows.

```ts
import { Function } from "#src/internal/lib/fnpackage.ts"
```

Let's set this up. We need to update two files. First, let's Node know about our import paths aliases. We add the following to our `package.json` file.

```json
{
    ...
    "imports": {
        "#src/*": "./src/*"
    },
    ...
}
```

Second, we update our `tsconfig.json` file and add the following to our `compilerOptions.paths` property.

```json
{
    "compilerOptions": {
        ...
        "paths": {
            "#src/*": [
                "./src/*"
            ]
        }
    }
}
```


### Adding useful scripts 

We can add some useful scripts in out `package.json` file.

```json
{
    ...
    "scripts": {
        "start": "node ./src/main.ts",
        "fmt": "npx prettier --write ./src/",
        "type-check": "npx tsc --noEmit",
        "lint": "npx eslint --fix ./src/",
        "check": "npm run type-check && npm run lint",
        "build": "npx esbuild src/main.ts --bundle --outfile=dist/index.js --platform=node --format=esm --packages=external --minify",
        "rm:dist": "rm -rf ./dist",
        "cp:package": "cp ./package*.json ./dist/",
        "pkg": "npm run rm:dist && npm run build && npm run cp:package",        
        "test": "node --test"
    },
    ...
}
```

You may notice some curious things here:
- We are using Node's built-in test-runner. No need for any external packages.
- In recent version of Node, we can run `*.ts` files directly without needing transpilation. We take advantage of this here.


## Integrating JSX / TSX

The above configurations will work in most scenarios. However, if we are rendering `tsx` views on the server, we need to make some adjustsments.

The first thing we need to adjust is that NodeJS does not support rendering `tsx` views directly. We will need to integrate `tsx` package.

```bash
$ npm i -D tsx
```

We will need to update the scripts in our `package.json`.

```json
{
    ...
    "scripts": {
        "start": "tsx ./src/main.ts",
        "test": "node --import tsx --test"
    },
}
```

Finally, we need to add the following entry to our `tsconfig.json`.

```json
{
    "compilerOptions": {
        "jsx": "react-jsx",
    }
}
```
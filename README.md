## How to setup unit test and the environment in our project

In this documentation I will try to show you the easiest way to setup a Jest testing environment for our Next.js app.

## 1. step

```bash
npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

Installs the packages that follow and saves them to your package.json file as development dependencies.

jest-environment-jsdom is a Jest environment that simulates a browser environment by providing a DOM (Document Object Model) implementation. This is needed when your tests involve browser-like behavior, such as DOM manipulation.

@testing-library/react is a library for testing React components. It provides utility functions for rendering components, querying the DOM, simulating events, and more.

@testing-library/jest-dom is a companion library to @testing-library/react that provides custom Jest matchers for testing the state of the DOM. For example, it provides matchers like toBeVisible or toContainElement that make your tests more expressive and easier to understand.

## 2.step

Create the following files.

```bash
jest.config.mjs
# and
jest.setup.js
```

refer to: (https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library)

## 3. Step

Add to package.json file in the scripts section.

```bash
"test": "jest",
"test-watch": "jest --watchAll"
```

## 4. step (optional)

Add these plugins to .eslintrc.json

```bash
npm i -D eslint-plugin-testing-library eslint-plugin-jest-dom
```

eslint-plugin-testing-library is a plugin for ESLint, a popular static code analysis tool used to find problematic patterns or code that doesn’t adhere to certain style guidelines. This plugin provides specific linting rules related to using Testing Library, a set of libraries used for testing JavaScript and TypeScript applications.

eslint-plugin-testing-library is to enforce best practices and consistent usage of Testing Library within your codebase. It helps to find violations in your test files, such as using forbidden queries, awaiting non-async queries, or not following the recommended async utility usage.

Edit eslintrc.json. Add the following for eslint-plugin-jest-dom.

```bash
['plugin:testing-library/react']
```

Edit eslintrc.json. Add the following for eslint-plugin-testing-library.

```bash
['plugin:jest-dom/recommended']
```

Our .eslintrc.json file should look like this:

```bash
{
  "extends": [
    "next/core-web-vitals",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}

```

## If parsing error occurs

If this error occurs: Parsing error: Cannot find module 'next/babel' Require stack: \*insert paths here.

Edit .eslintrc.json. Add the

```bash
"next/babel"
```

So it should look like this:

```bash
{
  "extends": ["next/babel","next/core-web-vitals"]
}

```

## Bonus info: Easiest setup with jest, if Next.js app is not created yet.

```bash
npx create-next-app --example with-jest with-jest-app
```

(https://github.com/vercel/next.js/tree/canary/examples/with-jest)

## Have fun testing!

Peter Fedorov. All Rights Reserved

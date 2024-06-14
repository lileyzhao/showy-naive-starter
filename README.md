<p align='center'>
  <b>Admin Dashboard UI Template Based on Vue + Vite + Naive + UnoCSS</b>
  <br>Create beautiful and simple admin dashboard UI projects quickly
</p>

<br>

<p align='center'>
<a href="#">Online Demo</a>
</p>

<br>

> This is an open-source project based on the latest technology stack, aimed at providing a simple admin dashboard template. The project was initially created for educational purposes, featuring a clean design without complex encapsulations and advanced techniques, making it an excellent project for learning front-end technologies. The author is originally a backend developer who had to learn front-end development out of necessity, and hopes this project can be helpful to you.

<br>

<p align='center'>
<b>English</b> | <a href="https://github.com/lileyzhao/showy-naive-template/blob/main/README.zh-CN.md">简体中文</a>
</p>

<br>

<p align='center'>
<a href="#">Online Documentation</a>
</p>

## Features

- ⚡️ **Vue 3** - The latest version of Vue
- 🚀 **Vite** - Super fast development build tool
- 🎨 **NaiveUI** - An interesting Vue 3 component library
- 💅 **UnoCSS** - High-performance and extremely flexible instant atomic CSS engine
- 💅 **ESLint** - Pre-configured rule set based on [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Pre-configured

### UI Framework

- [NaiveUI](https://www.naiveui.com/) - An interesting Vue 3 component library
- [UnoCSS](https://github.com/unocss/unocss) - High-performance and extremely flexible instant atomic CSS engine

### Plugins

- [Vue Router](https://github.com/vuejs/router) - Official router for Vue.js
- [Pinia](https://pinia.vuejs.org) - Lightweight and flexible state management tool for Vue
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - Automatically load components
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - Automatically import Composition API, etc.
- [VueUse](https://github.com/antfu/vueuse) - Collection of useful Composition API utilities
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization support

### Coding Style

- Use the Composition API with [`<script setup>` syntax](https://v3.vuejs.org/api/sfc-script-setup.html)
- [ESLint](https://eslint.org/) configured with the pre-configured rule set from [@antfu/eslint-config](https://github.com/antfu/eslint-config)

### Development Tools

- [pnpm](https://pnpm.io/) - Fast and disk space efficient package manager
- [Vite](https://vitejs.dev/) - Next-generation front-end toolchain
- [Vue TSC](https://github.com/johnsoncodehk/vue-tsc) - TypeScript compiler for Vue
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript

## Try it now!

> This project requires Node version >=14.18

### GitHub Template

[Create a repository using this template](https://github.com/lileyzhao/showy-naive-template/generate).

### Clone to local

If you prefer a cleaner git history, you can do it manually:

```bash
npx degit lileyzhao/showy-naive-template your-vue-admin-template
cd your-vue-admin-template
pnpm i # If you haven't installed pnpm, run: npm install -g pnpm
```

## Checklist

When using this template, try to update your own information correctly according to the checklist:

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `App.vue`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in the `public` directory
- [ ] Clean up the README and remove irrelevant information

Then, enjoy :)

## Usage

### Development

To see it in action at http://localhost:4318, just run:

```bash
pnpm dev
```

### Build

To build the application, run:

```bash
pnpm build
```

Then you will see the `dist` folder generated for publishing.

### Preview

After building, you can preview the build locally by running:

```bash
pnpm preview
```

### Deploy to Netlify

Go to [Netlify](https://app.netlify.com/start) and select your repository. Follow the instructions and your application will be created shortly.

## Project Structure

```plaintext
.
├── public/               # Public resources
├── src/                  # Source code
│   ├── apis/             # Backend APIs
│   ├── assets/           # Static assets
│   ├── layouts/          # Layouts
│   ├── modules/          # Modules
│   ├── router/           # Router
│   ├── setting/          # Configuration files
│   ├── shared/           # Shared classes
│   ├── store/            # State management
│   ├── utils/            # Utility functions
│   ├── views/            # Views
│   ├── App.vue           # Root component
│   └── main.ts           # Entry file
├── index.html            # Main HTML file
├── package.json          # Project information
├── vite.config.ts        # Vite configuration
├── uno.config            # UnoCSS configuration
└── tsconfig.json         # TypeScript configuration
```

---

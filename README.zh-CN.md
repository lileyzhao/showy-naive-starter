<p align='center'>
  <b>基于 Vue + Vite + Naive + UnoCSS 的管理后台UI模板</b>
  <br>快速创建优美简洁的管理后台UI项目
</p>

<br>

<p align='center'>
<a href="#">在线 Demo</a>
</p>

<br>

> 这是一个基于最新技术栈的开源项目，旨在提供一个简洁的管理后台模板。项目最初是为了教学目的而创建，设计简洁，没有复杂的封装和高级的写法，是学习前端技术的绝佳项目。作者本是一个后端开发者，学习前端开发是受形式所迫，希望这个项目能帮助到你。

<br>

<p align='center'>
<a href="https://github.com/lileyzhao/showy-naive-template/blob/main/README.md">English</a> | <b>简体中文</b>
</p>

<br>

<p align='center'>
<a href="#">在线文档</a>
</p>

## 特性

- ⚡️ **Vue 3** - 最新的 Vue 版本
- 🚀 **Vite** - 超快的开发构建工具
- 🎨 **NaiveUI** - 一个有点意思的 Vue 3 组件库
- 💅 **UnoCSS** - 高性能且极具灵活性的即时原子化 CSS 引擎
- 💅 **ESlint** - 基于[@antfu/eslint-config](https://github.com/antfu/eslint-config)的预置规则库

## 预配置

### UI 框架

- [NaiveUI](https://www.naiveui.com/) - 一个有点意思的 Vue 3 组件库
- [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

### 插件

- [Vue Router](https://github.com/vuejs/router) - Vue.js 官方路由
- [Pinia](https://pinia.vuejs.org) - 轻便灵活的 Vue 状态管理工具
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 自动加载组件
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 自动引入 Composition API 等
- [VueUse](https://github.com/antfu/vueuse) - 实用的 Composition API 工具合集
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - 国际化支持

### 编码风格

- 使用 Composition API 的 [`<script setup>` 语法](https://v3.vuejs.org/api/sfc-script-setup.html)
- [ESLint](https://eslint.org/) 配置为 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 的预置规则库

### 开发工具

- [pnpm](https://pnpm.io/) - 快速且节省磁盘空间的包管理器
- [Vite](https://vitejs.dev/) - 下一代前端工具链
- [Vue TSC](https://github.com/johnsoncodehk/vue-tsc) - Vue 的 TypeScript 编译器
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

## 现在可以试试!

> 该项目需要 Node 版本 >=14.18

### GitHub 模板

[使用这个模板创建仓库](https://github.com/lileyzhao/showy-naive-template/generate).

### 克隆到本地

如果您更喜欢使用更干净的 git 历史记录手动执行此操作

```bash
npx degit lileyzhao/showy-naive-template your-vue-admin-template
cd your-vue-admin-template
pnpm i # 如果你没装过 pnpm, 可以先运行: npm install -g pnpm
```

## 清单

使用此模板时，请尝试按照清单正确更新您自己的信息

- [ ] 在 `LICENSE` 中改变作者名
- [ ] 在 `App.vue` 中改变标题
- [ ] 在 `vite.config.ts` 更改主机名
- [ ] 在 `public` 目录下改变 favicon
- [ ] 整理 README 并删除无关信息

紧接着, 享受吧 :)

## 使用

### 开发

只需要执行以下命令就可以在 http://localhost:4318 中看到

```bash
pnpm dev
```

### 构建

构建该应用只需要执行以下命令

```bash
pnpm build
```

然后你会看到用于发布的 `dist` 文件夹被生成。

### 预览

构建完成后，可以运行以下命令来本地预览构建的内容

```bash
pnpm preview
```

### 部署到 Netlify

前往 [Netlify](https://app.netlify.com/start) 并选择你的仓库, 一路 `OK` 下去，稍等一下后，你的应用将被创建。

## 项目结构

```plaintext
.
├── public/               # 公共资源
├── src/                  # 源代码
│   ├── apis/             # 后端接口
│   ├── assets/           # 静态资源
│   ├── layouts/          # 布局
│   ├── modules/          # 模块
│   ├── router/           # 路由
│   ├── setting/          # 配置文件
│   ├── shared/           # 公共类
│   ├── store/            # 状态管理
│   ├── utils/            # 常用工具封装
│   ├── views/            # 页面
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── index.html            # 主 HTML 文件
├── package.json          # 项目信息
├── vite.config.ts        # Vite 配置
├── uno.config            # Unocss 配置
└── tsconfig.json         # TypeScript 配置
```

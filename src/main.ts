import { createApp } from 'vue'

import chalk from 'chalk'
import { router, setupRouter } from './router'
import App from './App.vue'
import type { UserModule } from './shared/types'

import '@unocss/reset/tailwind.css'
import '@/assets/styles/main.scss'
import 'virtual:uno.css'

async function bootstrap() {
  console.log(chalk.bgGreen.black(' 开发团队 ') + chalk.bgMagenta.white(' Showy '))

  const app = createApp(App)

  // 安装目录`modules/`下的所有模块
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })).forEach(i => i.install?.(app))

  // // 挂载国际化
  // setupI18n(app)

  // // 挂载状态管理
  // setupStore(app)

  // 挂载路由
  await setupRouter(app)

  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/Router.html#isReady
  await router.isReady()

  // 防止外部样式覆盖naive-ui组件样式
  // https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  // 应用挂载后移除加载效果
  app.mount('#app').$nextTick(() => {
    const loadingElement = document.getElementById('loading')
    if (loadingElement) {
      loadingElement.style.display = 'none'
    }
  })
}

// 执行应用设置
bootstrap()

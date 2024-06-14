import type { App } from 'vue'
import { createPinia } from 'pinia'
import { initAppSetting } from './modules/app'

const store = createPinia()

/**
 * Setup the pinia store 挂载状态管理
 */
export function setupStore(app: App<Element>) {
  app.use(store)

  initAppSetting()
}

export { store }

export * from './modules/app'

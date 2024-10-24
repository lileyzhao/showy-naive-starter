import type { RouteLocationNormalizedGeneric, RouteMeta } from 'vue-router'
import { defineStore } from 'pinia'

export interface Tab {
  name: string
  key: string
  meta: RouteMeta
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<Tab[]>([])
  const activeTab = ref('')

  const addTab = (route: RouteLocationNormalizedGeneric) => {
    if (!tabs.value.some(tab => tab.key === route.fullPath))
      tabs.value.push({ name: route.name as string, key: route.fullPath, meta: route.meta })
    activeTab.value = route.fullPath
  }

  const removeTab = async (removeKey: any) => {
    if (tabs.value.length === 1)
      return
    const tabIndex = tabs.value.findIndex(tab => tab.key === removeKey)
    if (tabIndex !== -1) {
      if (activeTab.value === removeKey) {
        const nextTab = tabs.value[tabIndex + 1] || tabs.value[tabIndex - 1]
        if (nextTab)
          activeTab.value = nextTab.key
      }
      tabs.value.splice(tabIndex, 1)
    }
  }

  return {
    tabs,
    activeTab,
    addTab,
    removeTab,
  }
})

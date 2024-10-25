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

  const addTab = async (route: RouteLocationNormalizedGeneric) => {
    if (!tabs.value.some(tab => tab.key === route.fullPath))
      tabs.value.push({ name: route.name as string, key: route.fullPath, meta: route.meta })
    await nextTick()
    activeTab.value = route.fullPath
  }

  const removeTab = async (removeKey: string) => {
    if (tabs.value.length === 1)
      return
    const tabIndex = tabs.value.findIndex(tab => tab.key === removeKey)
    if (tabIndex !== -1) {
      if (activeTab.value === removeKey) {
        const nextTab = tabs.value[tabIndex + 1] || tabs.value[tabIndex - 1]
        if (nextTab) {
          activeTab.value = nextTab.key
        }
      }
    }
    await nextTick()
    tabs.value.splice(tabIndex, 1)
  }

  const removeOtherTabs = async (currentKey: string) => {
    tabs.value = tabs.value.filter(tab => tab.key === currentKey)
  }
  const removeRightTabs = async (currentKey: string) => {
    const activeIndex = tabs.value.findIndex(tab => tab.key === currentKey)
    if (activeIndex !== -1) {
      tabs.value = tabs.value.slice(0, activeIndex + 1)
    }
  }

  return {
    tabs,
    activeTab,
    addTab,
    removeTab,
    removeOtherTabs,
    removeRightTabs,
  }
})

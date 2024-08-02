<script setup lang="ts" name="Layout-Default">
import MainSidebar from './components/MainSidebar.vue'
import SubSidebar from './components/SubSidebar.vue'
import ThemeDrawer from './components/ThemeDrawer.vue'
import MobileDrawer from './components/MobileDrawer.vue'
import TopBar from './components/TopBar.vue'
import { MenuButtonEnum, MenuPositionEnum } from '@/shared'
import { getFullRoutes } from '@/utils'
import { isDark } from '@/shared/composable/dark'

const app = useAppSettingStore()
const route = useRoute()
const fullRoutes = getFullRoutes()

const mountTimeout = ref<any[]>([])
const stopTimeout = ref<boolean>(false)
const mainSidebarRef = ref<InstanceType<typeof MainSidebar>>()
const topBarRef = ref<InstanceType<typeof TopBar>>()
const mobileDrawerRef = ref<InstanceType<typeof MobileDrawer>>()
const themeDrawerRef = ref<InstanceType<typeof ThemeDrawer>>()

// Get menu settings from the app store. 从应用存储中获取菜单设置。
const menuSetting = computed(() => app.menuSetting)

console.log(menuSetting.value, app.isMobile, 'isMobile')

/** Whether the menu is in the top bar layout. 是否顶栏菜单布局。 */
const isTopBar = computed(() => menuSetting.value.menuPosition === MenuPositionEnum.TOP_BAR)

/** Selected item in the main menu. 主栏菜单选中项。 */
const mainMenuKey = ref<string>()

/** Root route name of the main menu. 主菜单的根路由名。 */
const mainMenuRootKey = computed(() => {
  const findRootRoute = (parentName: string): string | undefined => {
    const parentRoute = fullRoutes.find(r => r.name === parentName)
    if (!parentRoute || parentRoute.name === 'root' || parentRoute.meta.parentName === 'root')
      return parentName

    return findRootRoute(parentRoute.meta.parentName as string)
  }

  const currRoute = fullRoutes.find(r => r.name === mainMenuKey.value)
  if (!currRoute)
    return route.matched[1].name as string
  else if (currRoute.meta.parentName === 'root')
    return currRoute.name as string
  else return findRootRoute(currRoute.meta.parentName as string)
})

/** Restore the sub-menu when the mouse enters the content area. 复原副栏菜单(当鼠标移入内容区时)。 */
const restoreSubMenu = useDebounceFn(() => {
  const tt = setTimeout(() => {
    if (stopTimeout.value)
      return
    if (!menuSetting.value.subMenu.collapsed) {
      // 刷新主栏菜单
      if (!app.isMobile && !isTopBar.value)
        mainSidebarRef.value?.refreshMainMenu()
      else if (!app.isMobile)
        topBarRef.value?.refreshTopMenu()
    }
  }, 700)
  mountTimeout.value?.push(tt)
}, 350)

/** Cancel the restore of the sub-menu. 取消复原副栏菜单。 */
const cancelRestoreSubMenu = () => {
  stopTimeout.value = true
  while (mountTimeout.value.length > 0) {
    const tt = mountTimeout.value.shift()
    clearTimeout(tt)
  }
}

/** Main menu selected item changed. 主栏菜单选中项改变。 */
const handleMainMenuKeyChange = (key: string) => {
  if (mainMenuKey.value === key)
    return
  mainMenuKey.value = key
  cancelRestoreSubMenu()
}

/** Sub-menu collapse state changed. 副栏菜单折叠状态改变。 */
const handleSubCollapsed = (collSubMenu: boolean) => {
  // Update the main menu. 更新主栏菜单。
  mainMenuKey.value = (collSubMenu ? route.name : route.matched[1].name) as string
}

onMounted(async () => {
  // Update the main menu. 更新主栏菜单。
  mainMenuKey.value = (menuSetting.value.subMenu.collapsed ? route.name : route.matched[1].name) as string
})

/** Handle various actions like toggling drawers. 处理各种操作，如切换抽屉。 */
const handleAction = (op: string, _val: any) => {
  if (op === 'toggleMobileDrawer')
    mobileDrawerRef.value?.show()
  else if (op === 'toggleThemeDrawer')
    themeDrawerRef.value?.show()
}
</script>

<template>
  <n-layout has-sider position="absolute" class="layout-default">
    <!-- Sidebar (Desktop). 侧边栏(电脑端)。 -->
    <template v-if="!app.isMobile">
      <!-- Sidebar (Desktop): Main Sidebar. 侧边栏(电脑端):主栏。 -->
      <MainSidebar
        v-if="!isTopBar" ref="mainSidebarRef" @key-change="handleMainMenuKeyChange"
        @mouseenter="cancelRestoreSubMenu" @mouseleave="stopTimeout = false"
      />
      <!-- Sidebar (Desktop): Sub Sidebar. 侧边栏(电脑端):副栏。 -->
      <SubSidebar
        v-if="!isTopBar || menuSetting.topMenu.showSubMenu" :parent-menu-key="mainMenuRootKey"
        @collapsed="handleSubCollapsed" @mouseenter="cancelRestoreSubMenu" @mouseleave="stopTimeout = false"
      />
    </template>

    <!-- Right main area. 右侧主体区。 -->
    <n-layout content-class="flex flex-col">
      <!-- Top bar area. 头部横栏区。 -->
      <TopBar
        ref="topBarRef" @action="handleAction" @key-change="handleMainMenuKeyChange"
        @mouseenter="cancelRestoreSubMenu" @mouseleave="stopTimeout = false"
      />
      <!-- Content area. 内容区。 -->
      <n-layout has-sider @mouseenter="restoreSubMenu">
        <n-layout-content :native-scrollbar="false" flex-1 :style="isDark ? 'background-color: #18181c;' : ''">
          <div p-8px :style="{ backgroundColor: isDark ? '#26262a' : '#f7fafc' }">
            <router-view v-slot="{ Component, route: r }">
              <transition name="fade">
                <keep-alive :max="25">
                  <component :is="Component" :key="r.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
          <n-back-top :right="40" />
        </n-layout-content>
      </n-layout>
    </n-layout>

    <!-- Drawer (Mobile). 抽屉栏(手机端)。 -->
    <MobileDrawer v-if="app.isMobile" ref="mobileDrawerRef" />

    <!-- Theme settings drawer. 主题设置抽屉栏。 -->
    <ThemeDrawer v-if="!app.isMobile && app.hasMenuButton(MenuButtonEnum.ThemeDrawer)" ref="themeDrawerRef" />
  </n-layout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

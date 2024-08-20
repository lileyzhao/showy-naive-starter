<script setup lang="ts" name="Layout-Default">
import chalk from 'chalk'
import MainSidebar from './components/MainSidebar.vue'
import SubSidebar from './components/SubSidebar.vue'
import ThemeDrawer from './components/ThemeDrawer.vue'
import MobileDrawer from './components/MobileDrawer.vue'
import TopBar from './components/TopBar.vue'
import { MenuButtonEnum, MenuPositionEnum } from '@/shared/typings/menu'
import { isDark } from '@/shared/hooks/dark'

const app = useAppStore()

const mainSidebarRef = ref<InstanceType<typeof MainSidebar>>()
const topBarRef = ref<InstanceType<typeof TopBar>>()
const mobileDrawerRef = ref<InstanceType<typeof MobileDrawer>>()
const themeDrawerRef = ref<InstanceType<typeof ThemeDrawer>>()

console.log(chalk.bgBlue.black.bold(' DefaultLayout ') + chalk.bgCyan.black(' MenuSetting: '), app.menuSetting)
console.log(chalk.bgBlue.black.bold(' DefaultLayout ') + chalk.bgCyan.black(' isMobile: '), app.isMobile)

/** Whether the menu is in the top bar layout. 是否顶栏菜单布局。 */
const isTopBar = computed(() => app.menuSetting.menuPosition === MenuPositionEnum.TOP_BAR)

/** Selected item in the main menu. 主栏菜单选中项。 */
const mainMenuRootKey = ref<string>()

/**
 * Main menu selected item changed. 主栏菜单选中项改变。
 * key is the root route name of the main menu. 传入的 key 是主栏菜单的根路由名。
 */
const handleMainMenuKeyChange = (key: string) => {
  // key is the root route name of the main menu. 此处的 key 是主栏菜单的根路由名。
  mainMenuRootKey.value = key
}

/** Handle various actions like toggling drawers. 处理各种操作，如切换抽屉。 */
const handleAction = (op: string, _val: any) => {
  if (op === 'toggleMobileDrawer')
    mobileDrawerRef.value?.show()
  else if (op === 'toggleThemeDrawer')
    themeDrawerRef.value?.show()
}
</script>

<template>
  <NLayout has-sider position="absolute" class="layout-default">
    <!-- Sidebar (Desktop). 侧边栏(电脑端)。 -->
    <template v-if="!app.isMobile">
      <!-- Sidebar (Desktop): Main Sidebar. 侧边栏(电脑端):主栏。 -->
      <MainSidebar v-if="!isTopBar" ref="mainSidebarRef" @key-change="handleMainMenuKeyChange" />
    </template>

    <!-- Right main area. 右侧主体区。 -->
    <NLayout content-class="flex flex-col">
      <!-- Top bar area. 头部横栏区。 -->
      <TopBar ref="topBarRef" @action="handleAction" @key-change="handleMainMenuKeyChange" />
      <!-- Content area. 内容区。 -->
      <NLayout has-sider>
        <!-- Sidebar (Desktop): Sub Sidebar. 侧边栏(电脑端):副栏。 -->
        <SubSidebar v-if="!app.isMobile && (!isTopBar || app.menuSetting.topMenu.showSubMenu)" :parent-menu-key="mainMenuRootKey" />
        <NLayoutContent :native-scrollbar="false" flex-1 :style="isDark ? 'background-color: #18181c;' : ''">
          <div p-8px :style="{ backgroundColor: isDark ? '#26262a' : '#f7fafc' }">
            <RouterView v-slot="{ Component, route: r }">
              <Transition name="fade">
                <KeepAlive :max="25">
                  <component :is="Component" :key="r.fullPath" />
                </KeepAlive>
              </Transition>
            </RouterView>
          </div>
          <NBackTop :right="40" />
        </NLayoutContent>
      </NLayout>
    </NLayout>

    <!-- Drawer (Mobile). 抽屉栏(手机端)。 -->
    <MobileDrawer v-if="app.isMobile" ref="mobileDrawerRef" />

    <!-- Theme settings drawer. 主题设置抽屉栏。 -->
    <ThemeDrawer v-if="!app.isMobile && app.hasMenuButton(MenuButtonEnum.ThemeDrawer)" ref="themeDrawerRef" />
  </NLayout>
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

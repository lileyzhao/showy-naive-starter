<script setup lang="ts">
import { isDark } from '@/shared/hooks/dark'
import { MenuButtonEnum, MenuPositionEnum } from '@/shared/typings/menu.d'
import { SUB_MENU_COUNT, UPDATE_SUB_MENU_COUNT } from '../shared/constants/symbols'
import LayoutContent from './components/LayoutContent.vue'
import MainSidebar from './components/MainSidebar.vue'
import MobileDrawer from './components/MobileDrawer.vue'
import SubSidebar from './components/SubSidebar.vue'
import ThemeDrawer from './components/ThemeDrawer.vue'
import TopBar from './components/TopBar.vue'

defineOptions({ name: 'DefaultLayout' })

const app = useAppStore()

const mainSidebarRef = ref<InstanceType<typeof MainSidebar>>()
const subSidebarRef = ref<InstanceType<typeof SubSidebar>>()
const topBarRef = ref<InstanceType<typeof TopBar>>()
const mobileDrawerRef = ref<InstanceType<typeof MobileDrawer>>()
const themeDrawerRef = ref<InstanceType<typeof ThemeDrawer>>()

/** Whether the menu is in the top bar layout. 是否顶栏菜单布局。 */
const isTopBar = computed(() => app.menuSetting.menuPosition === MenuPositionEnum.TOP_BAR)

const subMenuCount = ref(0)

/** Update the number of sub-menu items. 更新副栏菜单项数量的函数。 */
function updateSubMenuCount(count: number) {
  subMenuCount.value = count
}

// Provide the number of sub-menu items. 提供副栏菜单项数量。
provide(SUB_MENU_COUNT, subMenuCount)
provide(UPDATE_SUB_MENU_COUNT, updateSubMenuCount)

/** Main menu selected item changed. 主栏菜单选中项改变。 */
const handleMainMenuKeyChange = (key: string) => subSidebarRef.value?.loadSubMenu(key)

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
        <SubSidebar v-if="!app.isMobile && (!isTopBar || app.menuSetting.topMenu.showSubMenu)" ref="subSidebarRef" />
        <NLayout content-class="flex flex-col" class="flex flex-col">
          <NLayoutContent
            :native-scrollbar="false" content-class="flex flex-col flex-grow min-h-full"
            :style="`background-color:${isDark ? '#26262a' : '#f7fafc'}`"
          >
            <LayoutContent />
          </NLayoutContent>
          <n-layout-footer p-10px text-center :style="`background-color:${isDark ? '' : '#fff'}`">
            ShowyTeam @2024
          </n-layout-footer>
        </NLayout>
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

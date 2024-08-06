<script setup lang="ts" name="Layout-MainSidebar">
import type { MenuInst } from 'naive-ui'
import Logo from '@/layouts/components/Logo.vue'
import { mapRoutesMain } from '@/shared/utilities/menuUtil'
import { getFullRoutes } from '@/shared/utilities/routeUtil'

const emit = defineEmits(['keyChange'])

const { t } = useI18n()
const app = useAppStore()
const route = useRoute()
const fullRoutes = getFullRoutes()
const mainMenuRoutes = fullRoutes.filter(route => route.meta.parentName === 'root').filter(route => !route.meta?.hidden) ?? []

/** Selected Item in main-menu 主栏菜单选中项 */
const mainMenuKey = ref<string>()

/** Collapsed State of main-menu 主栏菜单收缩状态 */
const collMainMenu = computed({
  get: () => app.menuSetting.mainMenu.collapsed,
  set: val => app.setMenuSetting({ mainMenu: { collapsed: val } }),
})

/** Main column reverse color 主栏反转颜色 */
const mainMenuInverted = computed({
  get: () => app.menuSetting.mainMenu.inverted,
  set: val => app.setMenuSetting({ mainMenu: { inverted: val } }),
})

/** Reference to component 组件引用 */
const mainMenuRef = ref<MenuInst | null>()

/** main-menu data 主栏菜单数据 */
const mainMenuOptions = computed(() => {
  const mainMenuSetting = app.menuSetting.mainMenu
  return mainMenuRoutes.map(route => mapRoutesMain(route, fullRoutes, t, app.menuSetting.subMenu.collapsed, mainMenuSetting))
})

/** Handle main menu key change 处理主菜单键变化 */
const handleMainMenuKeyChange = (key: string) => emit('keyChange', key)

/** Refresh main menu 刷新主菜单 */
const refreshMainMenu = () => {
  mainMenuKey.value = (app.menuSetting.subMenu.collapsed ? route.name : route.matched[1].name) as string
  mainMenuRef.value?.showOption(mainMenuKey.value)
}

/** Style class for logo logo的样式类 */
const logoClass = computed(() => !app.isDark && app.menuSetting.mainMenu.inverted ? 'b-bl-gray2! b-b-1!' : '')

onMounted(refreshMainMenu)

watch(() => app.menuSetting.subMenu.collapsed, refreshMainMenu)

/** Exposes 公开对象 */
defineExpose({ refreshMainMenu })
</script>

<template>
  <!-- Sidebar (Desktop): Main Column 侧边栏(电脑端):主栏 -->
  <NLayoutSider
    collapse-mode="width"
    :width="app.menuSetting.subMenu.collapsed ? app.menuSetting.mainMenu.widthSingle : app.menuSetting.mainMenu.width"
    :collapsed-width="app.menuSetting.mainMenu.widthColl" :collapsed="collMainMenu" bordered
    :inverted="mainMenuInverted" style="box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);z-index:1"
  >
    <NLayoutHeader bordered :inverted="mainMenuInverted" :class="logoClass">
      <Logo w-full :hide-title="collMainMenu" />
    </NLayoutHeader>
    <!-- Main Menu 主栏菜单 -->
    <NMenu
      ref="mainMenuRef" v-model:value="mainMenuKey" :options="mainMenuOptions"
      :collapsed-width="app.menuSetting.mainMenu.widthColl" :collapsed="collMainMenu"
      :collapsed-icon-size="app.menuSetting.mainMenu.showLabel ? 20 : 22" :indent="16" :icon-size="16" accordion
      :class="`main-menu ${app.menuSetting.mainMenu.showLabel && app.menuSetting.mainMenu.collapsed ? 'main-menu-icon-label' : ''}`"
      :inverted="mainMenuInverted" @update:value="handleMainMenuKeyChange"
    />
    <div v-if="!app.isDark" absolute bottom-12px w-full flex justify-center>
      <div
        :class="`i-line-md:${mainMenuInverted ? 'sunny-filled hover:text-yellow' : 'moon-filled hover:text-purple'}`"
        cursor-pointer text-18px @click="mainMenuInverted = !mainMenuInverted"
      />
    </div>
  </NLayoutSider>
</template>

<style scoped lang="scss">
.main-menu {
  &.main-menu-icon-label {
    :deep(> .n-menu-item),
    :deep(> .n-submenu) {
      height: auto !important;

      .n-menu-item,
      .n-menu-item-content,
      .n-menu-item-content__icon {
        height: auto !important;
      }
    }
  }
}
</style>

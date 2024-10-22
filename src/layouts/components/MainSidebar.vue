<script setup lang="ts">
import type { MenuInst, MenuOption } from 'naive-ui'
import LayoutLogo from '~/src/layouts/components/LayoutLogo.vue'
import { mapRoutes } from '~/src/shared/utils/menuUtil'
import { findRootRouteName, getFullRoutes } from '~/src/shared/utils/routeUtil'

defineOptions({ name: 'MainSidebar' })

const emit = defineEmits(['keyChange'])

const { t } = useI18n()
const app = useAppStore()
const route = useRoute()
const fullRoutes = getFullRoutes()
const mainMenuRoutes = fullRoutes.filter(route => route.meta.parentName === 'root').filter(route => !route.meta?.hidden) ?? []

/** Reference to component 组件引用 */
const mainMenuRef = ref<MenuInst | null>()
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

/** main-menu data 主栏菜单数据 */
const mainMenuOptions = ref<MenuOption[]>()

/** Handle main menu key change 处理主菜单键变化 */
const handleMainMenuChange = async (menuKey: string) => {
  const rootKey = findRootRouteName(menuKey, fullRoutes) ?? menuKey
  if (rootKey === mainMenuKey.value)
    return
  mainMenuOptions.value = mainMenuRoutes.map(route => mapRoutes(route, fullRoutes, t, app.menuSetting, rootKey))
  await nextTick()
  mainMenuKey.value = app.menuSetting.subMenu.collapsed ? menuKey : rootKey
  emit('keyChange', menuKey)
}

onMounted(async () => {
  const menuKey = route.name as string
  await handleMainMenuChange(menuKey)
})

watch(() => app.menuSetting, () => {
  mainMenuKey.value = undefined
  handleMainMenuChange(route.name as string)
})

const mainSidebarProps = computed(() => {
  return {
    width: app.menuSetting.subMenu.collapsed ? app.menuSetting.mainMenu.widthSingle : app.menuSetting.mainMenu.width,
    collapseMode: 'width' as 'transform' | 'width',
    collapsed: app.menuSetting.mainMenu.collapsed,
    collapsedWidth: app.menuSetting.mainMenu.widthColl,
    inverted: mainMenuInverted.value,
    bordered: true,
  }
})

const mainMenuProps = computed(() => {
  return {
    collapsedWidth: collMainMenu.value ? app.menuSetting.mainMenu.widthColl : app.menuSetting.mainMenu.widthSingle,
    collapsed: app.menuSetting.mainMenu.collapsed || !app.menuSetting.subMenu.collapsed,
    collapsedIconSize: !app.menuSetting.subMenu.collapsed && app.menuSetting.mainMenu.collapsed && !app.menuSetting.mainMenu.showLabel
      ? 22
      : !app.menuSetting.mainMenu.collapsed && !app.menuSetting.subMenu.collapsed ? 16 : 20,
    indent: 16,
    iconSize: 16,
    accordion: true,
    class: [
      'main-menu',
      !app.menuSetting.mainMenu.collapsed && !app.menuSetting.subMenu.collapsed ? 'main-menu-nocoll' : '',
      app.menuSetting.mainMenu.collapsed && app.menuSetting.mainMenu.showLabel ? 'main-menu-coll-label' : '',
    ],
    inverted: mainMenuInverted.value,
    onUpdateValue: handleMainMenuChange,
  }
})

/** Style class for logo logo的样式类 */
const logoClass = computed(() => !app.isDark && app.menuSetting.mainMenu.inverted ? 'b-bl-gray2! b-b-1!' : '')
</script>

<template>
  <!-- Sidebar (Desktop): Main Column 侧边栏(电脑端):主栏 -->
  <NLayoutSider v-bind="mainSidebarProps">
    <NLayoutHeader bordered :inverted="mainMenuInverted" :class="logoClass">
      <LayoutLogo w-full :hide-title="mainSidebarProps.collapsed" />
    </NLayoutHeader>
    <!-- Main Menu 主栏菜单 -->
    <NMenu ref="mainMenuRef" v-model:value="mainMenuKey" :options="mainMenuOptions" v-bind="mainMenuProps" />
    <!-- Inverted Control 翻转控制 -->
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
  &.main-menu-nocoll {
    :deep(.n-menu-item-content) {
      padding-left: 14px !important;

      .n-menu-item-content__icon {
        margin-right: 8px !important;
      }

      .n-menu-item-content-header {
        opacity: 1 !important;
      }

      .n-base-icon {
        display: none;
      }
    }
  }

  &.main-menu-coll-label {
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

<script setup lang="ts">
import type { MenuInst, MenuOption } from 'naive-ui'
import { MenuButtonEnum, MenuPositionEnum } from '@/shared/typings/menu.d'
import { SUB_MENU_COUNT, UPDATE_SUB_MENU_COUNT } from '~/src/shared/constants/symbols'
import { mapRoutes } from '~/src/shared/utils/menuUtil'
import { findRootRouteName, getFullRoutes } from '~/src/shared/utils/routeUtil'

defineOptions({ name: 'SubSidebar' })

// Variables 变量
const { t } = useI18n()
const app = useAppStore()
const route = useRoute()
const fullRoutes = getFullRoutes()

// Inject the number of sub-menu items 注入副栏菜单项数量
const subMenuCount = inject(SUB_MENU_COUNT, ref(0))
const updateSubMenuCount = inject(UPDATE_SUB_MENU_COUNT, (_: number) => { })

/** Reference to component 组件引用 */
const subMenuRef = ref<MenuInst | null>()
/** Selected Item in sub-menu 副栏菜单选中项 */
const subMenuKey = ref<string>()

/** Collapsed State of sub-menu 副栏菜单收缩状态 */
const collSubMenu = computed({
  get: () => app.menuSetting.subMenu.collapsed,
  set: (val) => {
    if (app.menuSetting.subMenu.collapsed !== val)
      app.setMenuSetting({ subMenu: { collapsed: val } })
  },
})

/** sub-menu data 副栏菜单数据 */
const subMenuOptions = ref<MenuOption[]>([])

/** Load the sub-menu 加载副栏菜单 */
const loadSubMenu = async (menuKey: string) => {
  const rootKey = findRootRouteName(menuKey, fullRoutes) ?? menuKey
  updateSubMenuCount(fullRoutes.filter(r => r.meta.parentName === rootKey).length)

  // Update the sub-menu 更新副栏菜单
  if (!collSubMenu.value && subMenuCount.value > 0) {
    subMenuOptions.value = fullRoutes.filter(route => route.meta.parentName === rootKey).map(route => mapRoutes(route, fullRoutes, t))
  }
  else { subMenuOptions.value = [] }
  await nextTick()
  subMenuKey.value = menuKey
}

// Don't delete: causes sidebar menu to be blank on hot refresh. 勿删：会导致热刷新时副栏菜单空白。
onMounted(async () => loadSubMenu(route.name as string))

const subSidebarProps = computed(() => {
  return {
    width: app.menuSetting.subMenu.width,
    collapseMode: 'width' as 'transform' | 'width',
    collapsed: collSubMenu.value,
    collapsedWidth: 0,
    showTrigger: (app.menuSetting.buttons.includes(MenuButtonEnum.SubMenuStatus) && app.menuSetting.menuPosition === MenuPositionEnum.SIDEBAR ? 'arrow-circle' : false) as boolean | 'bar' | 'arrow-circle',
    onCollapse: () => collSubMenu.value = true,
    onExpand: () => collSubMenu.value = false,
    bordered: !collSubMenu.value,
    contentClass: 'of-x-hidden!',
  }
})

// Expose the menu loading function 公开菜单加载函数
defineExpose({ loadSubMenu })
</script>

<template>
  <!-- Sidebar (desktop): Sub-sidebar 侧边栏(电脑端):副栏 -->
  <NLayoutSider v-if="subMenuCount > 0" v-bind="subSidebarProps">
    <!-- Sub-menu 副栏菜单 -->
    <NMenu
      ref="subMenuRef" v-model:value="subMenuKey" :options="subMenuOptions" :collapsed-icon-size="16" :indent="16"
      :icon-size="16" accordion
    />
  </NLayoutSider>
</template>

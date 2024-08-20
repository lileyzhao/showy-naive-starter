<script setup lang="ts" name="Layout-SubSidebar">
import type { MenuInst, MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { MenuButtonEnum, MenuPositionEnum } from '@/shared/typings/menu'
import { mapRoutes } from '@/shared/utilities/menuUtil'
import { getFullRoutes } from '@/shared/utilities/routeUtil'

const props = defineProps({ parentMenuKey: { type: String, required: false } })

// Variables 变量
const { t } = useI18n()
const app = useAppStore()
const route = useRoute()
const fullRoutes = getFullRoutes()
const subMenuRoutes = ref<RouteRecordRaw[]>([])

// Reference to component 组件引用
const subMenuRef = ref<MenuInst | null>()
/** Selected Item in sub-menu 副栏菜单选中项 */
const subMenuKey = computed<string>(() => route.name as string)

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
const getSubMenuOptions = (mainMenuKey: string) => {
  return fullRoutes.filter(route => route.meta.parentName === mainMenuKey).map(route => mapRoutes(route, fullRoutes, t))
}

/** Refresh the sub-menu 刷新副栏菜单 */
const refreshSubMenu = (mainMenuRootKey?: string) => {
  subMenuRoutes.value = fullRoutes.filter(r => r.meta.parentName === (mainMenuRootKey || route.matched[1].name))

  // 更新副栏菜单 Update the sub-menu
  if (!collSubMenu.value && subMenuRoutes.value.length > 0) {
    subMenuOptions.value = getSubMenuOptions(mainMenuRootKey || route.matched[1].name as string)
  }
  else { subMenuOptions.value = [] }

  nextTick(() => subMenuRef.value?.showOption(subMenuKey.value))
}

/** Toggle sub-menu status 切换副栏菜单状态 */
const handleToggleSub = (status: boolean) => {
  collSubMenu.value = status
  refreshSubMenu()
}

// Do not delete: Removing onMounted will cause the menu to be blank during hot refresh
// 勿删：删掉onMounted会导致热刷新时菜单空白
onMounted(async () => refreshSubMenu())

// 监控主菜单变化
watch(() => props.parentMenuKey, val => refreshSubMenu(val))

const subSidebarProps = computed(() => {
  return {
    width: app.menuSetting.subMenu.width,
    collapseMode: 'width' as 'transform' | 'width',
    collapsed: collSubMenu.value,
    collapsedWidth: 0,
    showTrigger: (app.menuSetting.buttons.includes(MenuButtonEnum.SubMenuStatus) && app.menuSetting.menuPosition === MenuPositionEnum.SIDEBAR ? 'arrow-circle' : false) as boolean | 'bar' | 'arrow-circle',
    onCollapse: () => handleToggleSub(true),
    onExpand: () => handleToggleSub(false),
    bordered: !collSubMenu.value,
    contentClass: 'of-x-hidden!',
  }
})
</script>

<template>
  <!-- Sidebar (desktop): Sub-sidebar 侧边栏(电脑端):副栏 -->
  <NLayoutSider v-if="subMenuRoutes.length > 0" v-bind="subSidebarProps">
    <!-- Sub-menu 副栏菜单 -->
    <NMenu
      ref="subMenuRef" v-model:value="subMenuKey" :options="subMenuOptions" :collapsed-icon-size="16" :indent="16"
      :icon-size="16" accordion
    />
  </NLayoutSider>
</template>

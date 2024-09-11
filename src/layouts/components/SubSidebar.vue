<script setup lang="ts">
import { MenuButtonEnum, MenuPositionEnum } from '@/shared/typings/menu.d'
import type { MenuInst, MenuOption } from 'naive-ui'
import { SUB_MENU_COUNT, UPDATE_SUB_MENU_COUNT } from '~/src/shared/constants/symbols'
import { mapRoutes } from '~/src/shared/utils/menuUtil'
import { getFullRoutes } from '~/src/shared/utils/routeUtil'

defineOptions({ name: 'SubSidebar' })

const props = defineProps({ parentMenuKey: { type: String, required: false } })

// Variables 变量
const { t } = useI18n()
const app = useAppStore()
const route = useRoute()
const fullRoutes = getFullRoutes()

// Inject the number of sub-menu items 注入副栏菜单项数量
const subMenuCount = inject(SUB_MENU_COUNT, ref(0))
const updateSubMenuCount = inject(UPDATE_SUB_MENU_COUNT, (_: number) => { })

// Reference to component 组件引用
const subMenuRef = ref<MenuInst | null>()
/** Selected Item in sub-menu 副栏菜单选中项 */
const subMenuKey = computed<string>({ get: () => route.name as string, set: () => { } })

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
  updateSubMenuCount(fullRoutes.filter(r => r.meta.parentName === (mainMenuRootKey || route.matched[1].name)).length)

  // 更新副栏菜单 Update the sub-menu
  if (!collSubMenu.value && subMenuCount.value > 0) {
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
  <NLayoutSider v-if="subMenuCount > 0" v-bind="subSidebarProps">
    <!-- Sub-menu 副栏菜单 -->
    <NMenu
      ref="subMenuRef" v-model:value="subMenuKey" :options="subMenuOptions" :collapsed-icon-size="16" :indent="16"
      :icon-size="16" accordion
    />
  </NLayoutSider>
</template>

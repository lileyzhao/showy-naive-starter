<script setup lang="ts" name="Layout-SubSidebar">
import type { MenuInst, MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import Logo from '@/layouts/components/Logo.vue'
import { MenuButtonEnum, MenuPositionEnum } from '@/shared/schemas'
import { mapRoutes } from '@/shared/utilities/menuUtil'
import { getFullRoutes } from '@/shared/utilities'

const props = defineProps({ parentMenuKey: { type: String, required: false } })

const emit = defineEmits(['collapsed'])

// Variables 变量
const { t } = useI18n()
const app = useAppStore()
const route = useRoute()
const fullRoutes = getFullRoutes()
const subMenuRoutes = ref<RouteRecordRaw[]>([])

/** Menu setting 菜单设置 */
const menuSetting = computed(() => app.menuSetting)

/** Collapsed State of sub-menu 副栏菜单收缩状态 */
const collSubMenu = computed({
  get: () => menuSetting.value.subMenu.collapsed,
  set: (val) => {
    if (menuSetting.value.subMenu.collapsed !== val)
      app.setMenuSetting({ subMenu: { collapsed: val } })
  },
})

// Reference to component 组件引用
const subMenuRef = ref<MenuInst | null>()

/** Selected Item in sub-menu 副栏菜单选中项 */
const subMenuKey = computed<string>({
  get: () => route.name as string,
  set: () => { },
})

/** sub-menu data 副栏菜单数据 */
const subMenuOptions = ref<MenuOption[]>([])
const getSubMenuOptions = (mainMenuKey: string) => {
  return fullRoutes.filter(route => route.meta.parentName === mainMenuKey).map(route => mapRoutes(route, fullRoutes, t, true))
}

/** Refresh the sub-menu 刷新副栏菜单 */
const refreshSubMenu = (mainMenuRootKey?: string) => {
  subMenuRoutes.value = fullRoutes.filter(r => r.meta.parentName === (mainMenuRootKey || route.matched[1].name))

  // 更新副栏菜单 Update the sub-menu
  if (!collSubMenu.value && subMenuRoutes.value.length > 0) {
    subMenuOptions.value = getSubMenuOptions(mainMenuRootKey || route.matched[1].name as string)
    subMenuKey.value = route.name as string
  }
  else { subMenuOptions.value = [] }
  // Delay showing the sub-menu (to solve the problem that the sub-menu cannot expand the hierarchy)
  // 延迟显示副栏菜单(解决副栏菜单不能展开层级问题)
  setTimeout(() => subMenuRef.value?.showOption(subMenuKey.value), 128)
}

/** Toggle sub-menu status 切换副栏菜单状态 */
const handleToggleSub = (status: boolean) => {
  collSubMenu.value = status
  emit('collapsed', toRaw(collSubMenu.value))
  refreshSubMenu()
}

// Do not delete: Removing onMounted will cause the menu to be blank during hot refresh
// 勿删：删掉onMounted会导致热刷新时菜单空白
onMounted(async () => {
  refreshSubMenu()
})

// 监控主菜单变化
watch(() => props.parentMenuKey, (_val) => {
  refreshSubMenu(props.parentMenuKey)
})

/** Exposes 公开对象 */
defineExpose({ refreshSubMenu })
</script>

<template>
  <!-- Sidebar (desktop): Sub-sidebar 侧边栏(电脑端):副栏 -->
  <NLayoutSider
    v-if="subMenuRoutes.length > 0" collapse-mode="width" :width="menuSetting.subMenu.width"
    :collapsed-width="0" :collapsed="collSubMenu"
    :show-trigger="menuSetting.buttons.includes(MenuButtonEnum.SubMenuStatus) && app.menuSetting.menuPosition === MenuPositionEnum.SIDEBAR ? 'arrow-circle' : false"
    :bordered="!collSubMenu" content-class="of-x-hidden!" z-2 @collapse="handleToggleSub(true)"
    @expand="handleToggleSub(false)"
  >
    <NLayoutHeader bordered>
      <Logo
        v-if="app.menuSetting.menuPosition === MenuPositionEnum.TOP_BAR && app.menuSetting.topMenu.showSubMenu"
        flex-y-center p-l-5
      />
      <Logo v-else hide-logo :hide-title="!menuSetting.mainMenu.collapsed" flex-y-center p-l-5 />
    </NLayoutHeader>
    <!-- Sub-menu 副栏菜单 -->
    <NMenu
      ref="subMenuRef" v-model:value="subMenuKey" :options="subMenuOptions" :collapsed-icon-size="16" :indent="16"
      :icon-size="16" accordion
    />
  </NLayoutSider>
</template>

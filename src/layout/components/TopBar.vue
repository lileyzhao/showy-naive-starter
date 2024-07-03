<script setup lang="ts" name="Layout-TopBar">
import type { MenuInst } from 'naive-ui'
import Logo from '@/layout/components/Logo.vue'
import { useAppStore } from '@/store'
import { MENU_STATE_TEXT, MenuButtonEnum, MenuPositionEnum } from '@/shared'
import ActionIcon from '@/layout/components/ActionIcon.vue'
import { mapRoutes } from '@/utils/menuUtil'
import { availableLocales } from '@/modules/i18n'
import { getFullRoutes, renderProfileHeader, renderUnoIcon } from '@/utils'

const emit = defineEmits(['action', 'keyChange'])

// Variables 变量
const { t } = useI18n()
const app = useAppStore()
const router = useRouter()
const route = useRoute()
const fullRoutes = getFullRoutes()

// Component references 组件引用
const topMenuRef = ref<MenuInst | null>()

/** Menu setting 菜单设置 */
const menuSetting = computed(() => app.MenuSetting)

/** Whether it is top bar layout 是否顶栏菜单布局 */
const isTopBarLayout = computed(() => menuSetting.value.menuPosition === MenuPositionEnum.TOP_BAR)

/** Whether to show main menu status switch button 是否显示主菜单状态切换按钮 */
const showMainMenuStatusButton = computed(() => menuSetting.value.buttons.includes(MenuButtonEnum.MainMenuStatus))

/** Selected item in top menu 顶栏菜单选中项 */
const topMenuKey = ref<string>()

/** Top menu items 顶栏菜单项 */
const topMenuOptions = computed(() => {
  const routers = fullRoutes.filter(route => route.meta.parentName === 'root').filter(route => !route.meta?.hidden) ?? []
  return routers.map(route => mapRoutes(route, fullRoutes, t, !menuSetting.value.topMenu.showSubMenu))
})

/** Menu state switch icon 菜单状态切换图标 */
const menuStateIcon = computed(() => {
  const menuIconMap = { 1: 'i-line-md:download-off-outline', 2: 'i-line-md:menu-fold-right', 3: 'i-line-md:menu-unfold-left' }
  return app.isMobile ? 'i-line-md:menu-fold-right' : menuIconMap[menuSetting.value.menuState!] || ''
})

/** Toggle main-menu status 切换主栏菜单状态 */
const toggleMainMenu = () => app.isMobile ? emit('action', 'toggleMobileDrawer') : app.toggleMainMenuState()

const refreshTopMenu = () => {
  topMenuKey.value = (menuSetting.value.subMenu.collapsed ? route.name : route.matched[1].name) as string
  topMenuRef.value?.showOption(topMenuKey.value)
  emit('keyChange', toRaw(topMenuKey.value))
}

/** show theme drawer 显示主题设置抽屉 */
const toggleThemeDrawer = () => {
  emit('action', 'toggleThemeDrawer')
}

const toggleLanguage = (lang: string) => {
  router.push({
    path: `/${lang.toLowerCase()}${route.path.replace(new RegExp(`^/${route.params.lang}/`, 'gi'), '/')}`,
    query: route.query,
    hash: route.hash,
  })
}

const onTopMenuKeyChange = (key: string) => {
  emit('keyChange', key)
}

const profileOptions = computed(() => [
  {
    key: 'header',
    type: 'render',
    render: renderProfileHeader({
      name: t('author'),
      intro: t('intro'),
      avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG',
    }),
  },
  { type: 'divider', key: 'header-divider' },
  { key: 'profile', icon: renderUnoIcon('i-carbon:user-avatar-filled-alt'), label: t('profileMenu.profile') },
  { key: 'settings', icon: renderUnoIcon('i-carbon:settings'), label: t('profileMenu.settings') },
  { type: 'divider', key: 'logout-divider' },
  { key: 'logout', icon: renderUnoIcon('i-carbon:logout'), label: t('profileMenu.logout') },
])

const profileSelect = (key: string | number) => {
  switch (key) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      router.push('/login')
      break
  }
}

onMounted(() => {
  topMenuKey.value = (!menuSetting.value.topMenu.showSubMenu ? route.name : route.matched[1].name) as string
  topMenuRef.value?.showOption(topMenuKey.value)
})

const langs = computed(() => availableLocales.map(locale => ({ label: locale, key: locale })))

/** Exposes 公开对象 */
defineExpose({ refreshTopMenu })
</script>

<template>
  <!-- Left section of the top bar 头部左侧区 -->
  <n-layout-header bordered z-1>
    <div h-header flex-right-center gap-x-4>
      <!-- Left section of the top bar 头部左侧区 -->
      <div
        v-if="(!isTopBarLayout && showMainMenuStatusButton) || app.isMobile" h-full flex flex-1 items-center gap-x-4
        p-l-4
      >
        <div :class="menuStateIcon" cursor-pointer text-5 @click="toggleMainMenu" />
        <span v-if="!app.isMobile" font-size-3 text-gray>←{{ t(MENU_STATE_TEXT[menuSetting.menuState!]) }}</span>
      </div>
      <!-- Top logo 顶栏Logo -->
      <Logo v-if="isTopBarLayout && !menuSetting.topMenu.showSubMenu" flex-nowrap b-r-1 px-28px />
      <!-- Top menu 顶栏菜单 -->
      <div flex-1>
        <n-menu
          v-if="!app.isMobile && isTopBarLayout"
          ref="topMenuRef" v-model:value="topMenuKey" mode="horizontal" :options="topMenuOptions"
          :icon-size="20.5" responsive :indent="16" @update:value="onTopMenuKeyChange"
        />
      </div>
      <!-- Right section of the top bar 头部右侧区 -->
      <div h-full flex-right-center p-r-3>
        <ActionIcon
          v-if="menuSetting.topMenu.showSubMenu && isTopBarLayout && !app.isMobile" button
          icon-class="i-carbon:side-panel-close" @click="app.toggleMenuPosition"
        />
        <ActionIcon
          v-else-if="!app.isMobile" button
          :icon-class="`i-carbon:align-${isTopBarLayout ? 'horizontal-left' : 'vertical-top'}`"
          @click="app.toggleMenuPosition"
        />
        <ActionIcon
          v-if="menuSetting.buttons.includes(MenuButtonEnum.ThemeMode)" button
          :icon-class="`i-line-md:${app.IsDarkMode ? 'sunny-filled' : 'moon-filled '}`" hover-class-dark="text-yellow!"
          @click="app.toggleThemeMode"
        />
        <n-dropdown
          v-if="app.LocaleSetting.showButton && langs.length > 2" trigger="click" :options="langs"
          :show-arrow="true" @select="(key: string) => toggleLanguage(key)"
        >
          <div>
            <ActionIcon button icon-class="i-carbon:language" />
          </div>
        </n-dropdown>
        <ActionIcon
          v-if="app.LocaleSetting.showButton && langs.length === 2" button icon-class="i-carbon:language"
          @click="toggleLanguage"
        />
        <ActionIcon
          v-if="!app.isMobile && menuSetting.buttons.includes(MenuButtonEnum.ThemeDrawer)" button
          icon-class="i-carbon:cookie" @click="toggleThemeDrawer"
        />
        <n-dropdown :options="profileOptions" trigger="click" @select="profileSelect">
          <ActionIcon button icon-class="i-carbon:user-avatar text-6" :text="t('author')" />
        </n-dropdown>
      </div>
    </div>
  </n-layout-header>
</template>

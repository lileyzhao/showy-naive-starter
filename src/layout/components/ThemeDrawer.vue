<script setup lang="ts" name="Layout-ThemeDrawer">
import { useAppStore } from '@/store/modules/app'
import { ThemeModeEnum } from '@/shared'

const { t } = useI18n()
const app = useAppStore()

const icons: Record<ThemeModeEnum, string> = {
  [ThemeModeEnum.LIGHT]: 'i-line-md:sunny-filled',
  [ThemeModeEnum.DARK]: 'i-line-md:moon-filled',
  [ThemeModeEnum.SYSTEM]: 'i-carbon:contrast',
}

const texts: Record<ThemeModeEnum, string> = {
  [ThemeModeEnum.LIGHT]: 'theme.themeMode.light',
  [ThemeModeEnum.DARK]: 'theme.themeMode.dark',
  [ThemeModeEnum.SYSTEM]: 'theme.themeMode.system',
}

function handleDarkModeChange(value: ThemeModeEnum) {
  app.setThemeMode(value)
}

/** Main column reverse color 主栏反转颜色 */
const mainMenuInverted = computed({
  get: () => app.MenuSetting.mainMenu.inverted,
  set: val => app.setMenuSetting({ mainMenu: { inverted: val } }),
})

const drawerActive = ref(false)
const show = () => drawerActive.value = true

/** Exposes 公开对象 */
defineExpose({ show })
</script>

<template>
  <n-drawer
    v-model:show="drawerActive" display-directive="show" :width="325"
    :on-after-leave="() => drawerActive = false"
  >
    <n-drawer-content :title="t('theme.themeDrawerTitle')" :native-scrollbar="false" closable>
      <n-divider title-placement="left" dashed class="mt-0!">
        {{ t('theme.themeMode.title') }}
      </n-divider>
      <div class="flex-col-stretch gap-16px">
        <div class="i-flex-center">
          <n-tabs
            :key="app.ThemeModeRaw" type="segment" size="small" class="relative w-214px" :value="app.ThemeModeRaw"
            @update:value="handleDarkModeChange"
          >
            <n-tab v-for="(_, key) in icons" :key="key" :name="key">
              <div flex items-center justify-center gap-8px>
                <div :class="`${icons[key]} text-icon-small h-23px`" />
                <span>{{ t(texts[key]) }}</span>
              </div>
            </n-tab>
          </n-tabs>
        </div>
        <div v-if="app.ThemeModeRaw !== ThemeModeEnum.DARK" m-y-12px flex-y-center gap-8px>
          <span>深色侧边栏</span>
          <n-switch v-model:value="mainMenuInverted" />
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

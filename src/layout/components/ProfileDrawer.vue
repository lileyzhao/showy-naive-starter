<script setup lang="ts" name="Layout-ProfileDrawer">
import { DarkSchemeEnum } from '@/shared'

const { t } = useI18n()
const app = useAppSettingStore()

const icons: Record<DarkSchemeEnum, string> = {
  [DarkSchemeEnum.LIGHT]: 'i-line-md:sunny-filled',
  [DarkSchemeEnum.DARK]: 'i-line-md:moon-filled',
  [DarkSchemeEnum.AUTO]: 'i-carbon:contrast',
}

const texts: Record<DarkSchemeEnum, string> = {
  [DarkSchemeEnum.LIGHT]: 'theme.darkMode.light',
  [DarkSchemeEnum.DARK]: 'theme.darkMode.dark',
  [DarkSchemeEnum.AUTO]: 'theme.darkMode.system',
}

function handleDarkModeChange(value: DarkSchemeEnum) {
  app.setDarkScheme(value)
}

/** Main column reverse color 主栏反转颜色 */
const mainMenuInverted = computed({
  get: () => app.menuSetting.mainMenu.inverted,
  set: val => app.setMenuSetting({ mainMenu: { inverted: val } }),
})

const drawerActive = ref(false)
const show = () => drawerActive.value = true

/** Exposes 公开对象 */
defineExpose({ show })
</script>

<template>
  <n-drawer v-model:show="drawerActive" display-directive="show" :width="325">
    <n-drawer-content :title="t('theme.themeDrawerTitle')" :native-scrollbar="false" closable>
      <n-divider title-placement="left" dashed>
        {{ t('theme.darkMode.title') }}
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
        <div v-if="app.ThemeModeRaw !== DarkSchemeEnum.DARK" m-y-12px flex-y-center gap-8px>
          <span>深色侧边栏</span>
          <n-switch v-model:value="mainMenuInverted" />
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

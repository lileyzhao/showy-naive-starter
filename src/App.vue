<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { useAppStore } from '@/store/modules/app'
import { getNaiveDateLocale, getNaiveLocale } from '@/modules/i18n'

const app = useAppStore()
const theme = computed(() => (app.IsDarkMode ? darkTheme : null))
const locale = computed(() => getNaiveLocale(app.LocaleSetting.locale))
const dateLocale = computed(() => getNaiveDateLocale(app.LocaleSetting.locale))

// Naive default light theme color Naive默认亮色主题色
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#646CFF',
    primaryColorHover: '#646CFF',
    primaryColorPressed: '#646CFF',
    primaryColorSuppl: '#646CFF',
  },
}
</script>

<template>
  <n-config-provider :theme="theme" :locale="locale" :date-locale="dateLocale" :theme-overrides="themeOverrides" inline-theme-disabled>
    <!-- <n-theme-editor> -->
    <n-modal-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <router-view />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-modal-provider>
    <!-- </n-theme-editor> -->
  </n-config-provider>
</template>

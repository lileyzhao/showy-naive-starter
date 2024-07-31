<script setup lang="ts">
import { darkTheme } from 'naive-ui'

const app = useAppSettingStore()
const theme = computed(() => (isDark.value ? darkTheme : null))
const naiveLocale = computed(() => getNaiveLocale(app.localeSetting.locale))

console.log(navigator.language)
</script>

<template>
  <n-config-provider
    :theme="theme" :locale="naiveLocale.locale" :date-locale="naiveLocale.dateLocale"
    :theme-overrides="app.themeOverride" inline-theme-disabled
  >
    <n-theme-editor>
      <n-modal-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <n-message-provider>
              <router-view />
            </n-message-provider>
          </n-notification-provider>
        </n-dialog-provider>
      </n-modal-provider>
    </n-theme-editor>
  </n-config-provider>
</template>

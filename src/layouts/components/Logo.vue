<script setup lang="ts" name="Layout-Logo">
import { useThemeVars } from 'naive-ui'

const props = defineProps({ hideLogo: Boolean, hideTitle: Boolean })

const { t } = useI18n()
const themeVars = useThemeVars()

const mainClass = computed(() => !props.hideTitle ? 'pl-4' : 'flex-x-center')
const titleClass = computed(() => !props.hideLogo ? 'p-l-2.5' : '')
</script>

<template>
  <div h-header of-hidden :class="mainClass" :style="`border-color:${themeVars.dividerColor}`">
    <div h-full flex>
      <NText v-if="!props.hideLogo" type="primary" h-full inline-flex-center>
        <span i-carbon:wind-gusts font-size-10 />
      </NText>
      <NText v-if="!props.hideTitle" type="primary" :class="titleClass" h-full inline-flex-center>
        <span pt-1 text-nowrap font-size-5 font-bold>{{ t('team') }}</span>
      </NText>
    </div>
  </div>
</template>

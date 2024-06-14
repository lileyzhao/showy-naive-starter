<script setup lang="ts" name="Layout-ActionIcon">
import { useAppStore } from '@/store/modules/app'

const props = defineProps<{
  /** it is a button? 是否显示为按钮 */
  button?: boolean
  /**
   * Override the default class, when displayed as a button
   * 重写默认的class，显示为按钮时有效
   */
  class?: string
  /** text to display 显示文本 */
  text?: string
  /** class for the text 文本的类 */
  textClass?: string
  /** class for the icon 图标的类 */
  iconClass?: string
  /** hover class in dark mode 暗模式下的悬停的类 */
  hoverClassDark?: string
  /** hover class in light mode 亮模式下的悬停的类 */
  hoverClassLight?: string
}>()

const defaultBtnClass = 'px-2.6!'
const defaultIconClass = 'text-5 cursor-pointer'

/** Button class 按钮类 */
const buttonClass = computed(() => `${defaultBtnClass} ${props.class ?? ''}`)

/** Icon class 图标类 */
const iconClass = computed(() => `${defaultIconClass} ${props.class ?? ''} ${props.iconClass ?? ''}`)
</script>

<template>
  <NTag v-if="props.button" checkable size="large" :class="buttonClass">
    <div flex-y-center flex-row gap-x-2>
      <div :class="iconClass" />
      <span v-if="text" :class="props.textClass">{{ props.text }}</span>
    </div>
  </NTag>
  <div v-else :class="iconClass" />
</template>

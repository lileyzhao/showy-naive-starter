<script setup lang="ts"  name="SyIconButton2">
import { computed, defineProps } from 'vue'

const props = defineProps({
  icon: String,
  size: [Number, String],
  button: Boolean,
  text: String,
  vertical: Boolean,
  class: [String, Array, Object],
  style: [String, Object],
})

const iconStyle = computed(() => ({ fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size }))

const customClass = computed(() => props.class)
const customStyle = computed(() => props.style)
</script>

<template>
  <div
    class="sy-icon-button" :class="[icon, { 'sy-is-button': button }, customClass]"
    :style="[iconStyle, customStyle]"
  >
    <div class="sy-icon-container" :class="[{ 'sy-vertical': vertical }]">
      <div :class="icon" :style="iconStyle" />
      <span v-if="text">{{ text }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sy-icon-button {
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  cursor: pointer;

  &.sy-is-button {
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e0e0; // 浅灰色
    }
  }

  .sy-icon-container {
    display: flex;
    align-items: center;

    &.sy-vertical {
      flex-direction: column;
    }

    span {
      margin-left: 8px;

      &.sy-vertical {
        margin-left: 0;
        margin-top: 8px;
      }
    }
  }
}

.dark {
  .sy-icon-button {
    background-color: #333; // 示例暗色背景色

    &.sy-is-button {
      &:hover {
        background-color: #555; // 示例暗色悬停背景色
      }
    }

    .sy-icon-container {
      span {
        color: #fff; // 示例暗色文本颜色
      }
    }
  }
}
</style>

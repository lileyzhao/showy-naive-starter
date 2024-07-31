<script setup lang="ts">
import type { Type } from 'naive-ui/es/button/src/interface'

const { t } = useI18n()
const app = useAppSettingStore()
const route = useRoute()

const currentTime = ref('00:00:00')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
}

const showModal = ref(false)
// 定义异步组件
const asyncComponent = defineAsyncComponent(() =>
  import('./about.vue'),
)

const buttonModels = [{}, { secondary: true }, { tertiary: true }, { dashed: true }, { disabled: true }]
const buttonTypes: Type[] = ['default', 'primary', 'info', 'success', 'warning', 'error']
const buttonTypesShuffled: Type[][] = []
for (let i = 0; i < buttonModels.length; i++) {
  buttonTypesShuffled.push(buttonTypes.slice().sort(() => 0.5 - Math.random()).slice(0, 4))
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <n-card class="m--8px" content-class="!p-0" :bordered="false">
    <div flex flex-col items-center justify-center gap-y-4 pt-4>
      <div
        :class="`i-line-md:${app.IsDarkMode ? 'moon-filled-loop text-purple' : 'sunny-filled-loop text-yellow'}`"
        text-24
      />
      <div class="time-display">
        {{ currentTime }}
      </div>
      <div text-6>
        {{ app.IsDarkMode ? t('welcome.night') : t('welcome.morning') }}
      </div>
      <div decoration-underline>
        {{ route?.path }}
      </div>
      <n-space>
        <n-date-picker type="date" w-48 />
        <n-time-picker w-48 />
      </n-space>
      <n-space v-for="(bm, bmi) in buttonModels" :key="bmi">
        <n-button v-for="(bt, bti) in buttonTypesShuffled[bmi]" :key="bti" :type="bt" class="w-23!" v-bind="bm">
          {{ bt }}
        </n-button>
      </n-space>
    </div>
    <div class="h-60vh flex flex-col items-center justify-end pb-4 text-4">
      ... {{ t('intro') }} ...
    </div>
    <n-modal v-model:show="showModal" preset="card">
      <component :is="asyncComponent" />
    </n-modal>
  </n-card>
</template>

<style scoped lang="scss">
@import '../assets/styles/_fonts.scss';

.time-display {
  font-family: 'DSEG7ModernMini', sans-serif;
  font-size: 2rem;
  font-weight: bold;
}
</style>

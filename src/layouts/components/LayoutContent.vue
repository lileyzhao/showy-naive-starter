<script setup lang="ts">
import { isDark } from '@/shared/hooks/dark'

defineOptions({ name: 'LayoutContent' })
</script>

<template>
  <div p-8px :style="{ backgroundColor: isDark ? '#26262a' : '#f7fafc' }">
    <RouterView v-slot="{ Component, route: r }">
      <Transition name="fade">
        <KeepAlive :max="25">
          <component :is="Component" :key="r.fullPath" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

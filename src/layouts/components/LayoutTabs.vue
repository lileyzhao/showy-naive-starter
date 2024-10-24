<script setup lang="ts">
import SyIconButton from '@/shared/components/SyIconButton.vue'
import { renderUnoIcon } from '~/src/shared/utils/componentUtil'

const { t } = useI18n()
const router = useRouter()

const tabsStore = useTabsStore()

const tabs = computed(() => tabsStore.tabs)

const handleTabChange = (tabName: string) => {
  router.push(tabName)
}

async function handleTabClose(tabName: string) {
  tabsStore.removeTab(tabName)
  router.push(tabsStore.activeTab)
}

const menuOptions = [
  {
    label: '关闭',
    key: 'closeTab',
    icon: renderUnoIcon('i-lucide:x'),
  },
  {
    label: '固定',
    key: 'pinTab',
    icon: renderUnoIcon('i-lucide:pin'),
  },
  {
    label: '重新加载',
    key: 'reload',
    icon: renderUnoIcon('i-lucide:rotate-cw'),
  },
  {
    label: '在新窗口打开',
    key: 'openInNewWindow',
    icon: renderUnoIcon('i-lucide:external-link'),
  },
  {
    type: 'divider',
    key: 'divider1',
  },
  {
    label: '关闭其他',
    key: 'closeOtherTabs',
    icon: renderUnoIcon('i-lucide:badge-x'),
  },
  {
    label: '关闭右侧标签',
    key: 'closeRightTabs',
    icon: renderUnoIcon('i-lucide:list-x rotate-180'),
  },
  {
    label: '全部关闭',
    key: 'closeAllTabs',
    icon: renderUnoIcon('i-lucide:copy-x'),
  },
]
</script>

<template>
  <div class="pt-3px">
    <NTabs
      v-model:value="tabsStore.activeTab" type="card" animated closable tab-style="min-width: 80px;" size="small"
      pane-wrapper-class="pwc" class="pwc" :on-update:value="handleTabChange" @close="handleTabClose"
    >
      <NTab v-for="tb in tabs" :key="tb.key" :tab="tb.meta.title as string || tb.name || tb.key" :name="tb.key">
        {{ t(tb.meta.title as string) || tb.name }}
      </NTab>
      <template #suffix>
        <NDropdown :options="menuOptions" trigger="manual">
          <SyIconButton button icon="i-carbon:chevron-down" ml--16px />
        </NDropdown>
        <NDivider vertical />
        <SyIconButton button icon="i-lucide:fullscreen" />
      </template>
    </NTabs>
  </div>
</template>

<style scoped>
:deep(.n-tabs-tab.n-tabs-tab--closable button) {
  display: none !important;
}

:deep(.n-tabs-tab.n-tabs-tab--active.n-tabs-tab--closable button) {
  display: unset !important;
}
</style>

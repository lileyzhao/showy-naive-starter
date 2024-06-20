<script setup lang="ts">
import { computed } from 'vue'
import { useThemeVars } from 'naive-ui'
import { useAppStore } from '@/store/modules/app'
import pkg from '@/../package.json'

const app = useAppStore()
const themeVars = useThemeVars() // Get theme variables 获取主题变量

const { t } = useI18n()

const column = computed(() => (app.isMobile ? 1 : 2))

interface PkgJson {
  name: string
  version: string
  website?: string
  dependencies: PkgVersionInfo[]
  devDependencies: PkgVersionInfo[]
}

interface PkgVersionInfo {
  name: string
  version: string
}

const { name, version, dependencies, devDependencies } = pkg

function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [$name, $version] = tuple
  return {
    name: $name,
    version: $version,
  }
}

const pkgJson: PkgJson = {
  name,
  version,
  dependencies: Object.entries(dependencies).map(item => transformVersionData(item)),
  devDependencies: Object.entries(devDependencies).map(item => transformVersionData(item)),
}

const latestBuildTime = BUILD_TIME
</script>

<template>
  <n-card content-class="!p-8px" :bordered="false">
    <n-space vertical :size="14">
      <n-card :title="t('page.about.title')" :bordered="false" size="small" segmented class="card-wrapper">
        <p>{{ t('page.about.introduction') }}</p>
      </n-card>
      <n-card :title="t('page.about.projectInfo.title')" :bordered="false" size="small" segmented class="card-wrapper">
        <n-descriptions label-placement="left" bordered size="small" :column="column">
          <n-descriptions-item :label="t('page.about.projectInfo.version')">
            <n-tag type="primary">
              {{ pkgJson.version }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item :label="t('page.about.projectInfo.latestBuildTime')">
            <n-tag type="primary">
              {{ latestBuildTime }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item :label="t('page.about.projectInfo.githubLink')">
            <a
              :style="`color:${themeVars.primaryColor}`" :href="pkg.homepage" target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('page.about.projectInfo.githubLink') }}
            </a>
          </n-descriptions-item>
          <n-descriptions-item :label="t('page.about.projectInfo.previewLink')">
            <a :style="`color:${themeVars.primaryColor}`" :href="pkg.website" target="_blank" rel="noopener noreferrer">
              {{ t('page.about.projectInfo.previewLink') }}
            </a>
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
      <n-card :title="t('page.about.prdDep')" :bordered="false" size="small" segmented class="card-wrapper">
        <n-descriptions label-placement="left" bordered size="small" :column="column">
          <n-descriptions-item v-for="item in pkgJson.dependencies" :key="item.name" :label="item.name">
            {{ item.version }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
      <n-card :title="t('page.about.devDep')" :bordered="false" size="small" segmented class="card-wrapper">
        <n-descriptions label-placement="left" bordered size="small" :column="column">
          <n-descriptions-item v-for="item in pkgJson.devDependencies" :key="item.name" :label="item.name">
            {{ item.version }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-space>
  </n-card>
</template>

<style scoped></style>

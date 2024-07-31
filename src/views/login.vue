<script setup lang="ts">
import SyIconButton from '@/shared/components/SyIconButton.vue'

const { t } = useI18n()
const router = useRouter()
const app = useAppSettingStore()

const model = ref({ account: 'admin', password: 'admin' })

const onLogin = () => router.push('/')
</script>

<template>
  <div mx-auto mt-30 w-380px>
    <n-card :title="t('login.title')">
      <n-form :model="model">
        <n-form-item path="account" label="账号">
          <n-input v-model="model.account" placeholder="请输入账号" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model="model.password" type="password" placeholder="请输入密码" @keydown.enter.prevent />
        </n-form-item>
        <div flex items-center justify-between>
          <div flex-right-center gap-x-5>
            <SyIconButton
              :icon="`i-line-md:${app.IsDarkMode ? 'sunny-filled' : 'moon-filled'}`"
              hover-class-dark="text-yellow" hover-class-light="text-purple" @click="app.toggleThemeMode"
            />
            <SyIconButton v-if="app.LocaleSetting.showButton" i-carbon-language @click="app.toggleLanguage" />
          </div>
          <n-button type="primary" style="width: 120px" @click="onLogin">
            登 录
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

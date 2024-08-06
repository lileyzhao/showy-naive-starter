import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd())
  const buildTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        dts: 'src/shared/typings/auto-import.d.ts', // 路径下自动生成文件夹存放全局指令
        dirs: [
          'src/shared/hooks',
          'src/shared/constants',
          'src/shared/schemas',
          'src/store',
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: 'src/shared/typings/components.d.ts', // 路径下自动生成文件夹存放全局指令
      }),
      // https://github.com/antfu/unocss
      UnoCSS(),
      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [resolve(__dirname, 'locales/**')],
      }),
      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),
    ],
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      // 要忽略的后缀
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
    },
    build: {
      target: 'esnext',
      // target: ["chrome89", "edge89", "firefox89", "safari15"],
      // vite默认值为500kb，可以自主修改
      chunkSizeWarningLimit: 500,
    },
    server: {
      host: true,
      port: Number(env.VITE_APP_PORT),
    },
    preview: {
      host: true,
      port: Number(env.VITE_APP_PORT) + 1,
    },
  }
})

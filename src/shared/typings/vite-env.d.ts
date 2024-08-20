/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_PORT: number
  readonly VITE_APP_BASE_URL: string
  // More env variables... 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
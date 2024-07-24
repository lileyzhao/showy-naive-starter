// these APIs are auto-imported from @vueuse/core
export const APP_THEME_SCHEMA_KEY = 'app-theme-scheme'

export const isDark = useDark({ storageKey: APP_THEME_SCHEMA_KEY })
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

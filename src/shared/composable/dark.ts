// these APIs are auto-imported from @vueuse/core

export const APP_DARK_SCHEMA_KEY = 'app-dark-scheme'

export const isDark = useDark({ storageKey: APP_DARK_SCHEMA_KEY })
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

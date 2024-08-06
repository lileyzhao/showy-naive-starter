export const isDark = useDark({ storageKey: APP_DARK_SCHEME_KEY })
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

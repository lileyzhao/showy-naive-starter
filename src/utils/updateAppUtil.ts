import { addClass, hasClass, removeClass } from './domUtil'
import { availableLocales, i18n, setOrLoadLanguageAsync } from '@/modules/i18n'
import { localeSetting } from '@/setting/appSetting'
import { LocaleEnum, type LocaleSetting, ThemeModeEnum } from '@/shared'
import { router } from '@/router'

/**
 * Update the HTML element theme.
 * 更新HTML元素的主题。
 *
 * @param mode - The theme mode to set. 主题模式。
 */
export async function updateThemeMode(mode: ThemeModeEnum | null = ThemeModeEnum.LIGHT) {
  const htmlRoot = document.getElementById('htmlRoot')
  if (!htmlRoot)
    return

  const isDarkMode = mode === ThemeModeEnum.DARK
  htmlRoot.setAttribute('data-theme', isDarkMode ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT)

  // If the mode is 'dark', add the 'dark' class if it's not already present.
  // 如果模式是'dark'，未存在'dark'类时添加它。
  if (isDarkMode && !hasClass(htmlRoot, ThemeModeEnum.DARK)) {
    addClass(htmlRoot, ThemeModeEnum.DARK)
  }
  // Otherwise, remove the 'dark' class if it exists.
  // 否则，存在'dark'类时移除它。
  else if (hasClass(htmlRoot, ThemeModeEnum.DARK)) {
    removeClass(htmlRoot, ThemeModeEnum.DARK)
  }
}

/**
 * Update the locale setting.
 * 更新区域设置。
 *
 * @param setting - The locale setting to apply. 区域设置。
 */
export async function updateLocale(setting: LocaleSetting = localeSetting) {
  const htmlRoot = document.getElementById('htmlRoot')
  if (!htmlRoot)
    return

  // Load the appropriate language setting asynchronously.
  // 异步加载适当的语言设置。
  const locale
    = setting.locale
    ?? (navigator.language.includes('en') && availableLocales.includes(LocaleEnum.enUS) ? LocaleEnum.enUS : availableLocales[0])
  await setOrLoadLanguageAsync(locale)

  // Set the 'lang' attribute of the HTML root element based on the locale setting or browser language.
  // 根据区域设置或浏览器语言设置HTML根元素的'lang'属性。
  const lang = setting.locale ?? (navigator.language.includes('zh') ? LocaleEnum.zhCN : LocaleEnum.enUS)
  htmlRoot.setAttribute('lang', lang)

  // Update the document title based on the current route's metadata and the app's title.
  // 根据当前路由的元数据和应用程序标题更新文档标题。
  const routeTitle = router.currentRoute.value.meta.title as string
  if (router.currentRoute.value.meta.title)
    document.title = `${i18n.global.t(routeTitle)} | ${import.meta.env.VITE_APP_TITLE}`
}

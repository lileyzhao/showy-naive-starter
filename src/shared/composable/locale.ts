import type { NDateLocale, NLocale } from 'naive-ui'
import { dateEnUS, dateJaJP, dateKoKR, dateZhCN, dateZhTW, enUS, jaJP, koKR, zhCN, zhTW } from 'naive-ui'

export const APP_LOCALE_KEY = 'app-locale-setting'

/**
 * Define return type.
 * 定义返回类型
 */
interface NaiveLocale {
  locale: NLocale
  dateLocale: NDateLocale
  display: string
}

/**
 * Locale mapping object.
 * Locale 映射对象
 */
export const localeMap: Record<string, NaiveLocale> = {
  'en-US': { locale: enUS, dateLocale: dateEnUS, display: 'English (United States)' },
  'ja-JP': { locale: jaJP, dateLocale: dateJaJP, display: '日本語 (日本)' },
  'ko-KR': { locale: koKR, dateLocale: dateKoKR, display: '한국어 (대한민국)' },
  'zh-CN': { locale: zhCN, dateLocale: dateZhCN, display: '中文 (简体)' },
  'zh-TW': { locale: zhTW, dateLocale: dateZhTW, display: '中文 (繁體)' },
}

/**
 * Get Naive UI locale
 * 获取 Naive UI 的本地化
 *
 * @param {string} [locale] - 语言区域代码
 * @returns {NaiveLocale} 包含 locale 和 dateLocale 的对象
 */
export function getNaiveLocale(locale: string = 'en-US'): NaiveLocale {
  locale = locale.replace('_', '-')

  // Attempt to get the locale directly from the map
  // 尝试直接从映射中获取本地化设置
  if (localeMap[locale]) {
    return localeMap[locale]
  }

  // Split the locale into parts
  // 将本地化代码拆分成部分
  const [language] = locale.split('-')

  // Try to find the first matching locale for the simple language code
  // 尝试找到第一个匹配的简单语言代码的本地化设置
  for (const key in localeMap) {
    if (key.startsWith(language)) {
      return localeMap[key]
    }
  }

  return { locale: enUS, dateLocale: dateEnUS, display: 'English (United States)' }
}

/**
 * Get locale name
 * 获取本地化名称
 *
 * @param {string} [locale] - 语言区域代码
 * @returns {string} 用于前端显示的名称
 */
export function getLanguageName(locale: string = 'en-US'): string {
  locale = locale.replace('_', '-')

  // Attempt to get the label directly from the map
  // 尝试直接从映射中获取标签
  if (localeMap[locale].display) {
    return localeMap[locale].display
  }

  // Split the locale into parts
  // 将本地化代码拆分成部分
  const [language] = locale.split('-')

  // Try to find the first matching label for the simple language code
  // 尝试找到第一个匹配的简单语言代码的标签
  for (const key in localeMap) {
    if (key.startsWith(language)) {
      return localeMap[key].display
    }
  }

  return 'Unknown'
}

/**
 * Browser language
 * 浏览器语言
 */
export const browserLanguage = useNavigatorLanguage()

import type { NDateLocale, NLocale } from 'naive-ui'
import {
  arDZ,
  dateArDZ,
  dateDeDE,
  dateEnUS,
  dateItIT,
  dateJaJP,
  dateKoKR,
  dateRuRU,
  dateZhCN,
  dateZhTW,
  deDE,
  enUS,
  itIT,
  jaJP,
  koKR,
  ruRU,
  zhCN,
  zhTW,
} from 'naive-ui'

export const APP_LOCALE_KEY = 'app-locale-setting'

/**
 * Define return type.
 * 定义返回类型
 */
interface NaiveLocale {
  locale: NLocale
  dateLocale: NDateLocale
}

/**
 * Locale mapping object.
 * Locale 映射对象
 */
export const localeMap: Record<string, NaiveLocale> = {
  'ar-DZ': { locale: arDZ, dateLocale: dateArDZ },
  'ar-KW': { locale: arDZ, dateLocale: dateArDZ },
  'de-DE': { locale: deDE, dateLocale: dateDeDE },
  'en-US': { locale: enUS, dateLocale: dateEnUS },
  'it-IT': { locale: itIT, dateLocale: dateItIT },
  'ja-JP': { locale: jaJP, dateLocale: dateJaJP },
  'ko-KR': { locale: koKR, dateLocale: dateKoKR },
  'ru-RU': { locale: ruRU, dateLocale: dateRuRU },
  'zh-CN': { locale: zhCN, dateLocale: dateZhCN },
  'zh-TW': { locale: zhTW, dateLocale: dateZhTW },
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

  return { locale: enUS, dateLocale: dateEnUS }
}

/**
 * Browser language
 * 浏览器语言
 */
export const browserLanguage = useNavigatorLanguage()

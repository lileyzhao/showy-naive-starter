import type { NDateLocale, NLocale } from 'naive-ui'
import {
  arDZ,
  dateArDZ,
  dateEnUS,
  dateItIT,
  dateJaJP,
  dateKoKR,
  dateRuRU,
  dateZhCN,
  dateZhTW,
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

  // Get locale setting from the mapping object, use default value if not found
  // 从映射对象中获取 locale 设置，如果不存在则使用默认值
  return localeMap[locale] || { locale: enUS, dateLocale: dateEnUS }
}

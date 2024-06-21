import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LocaleSetting, MenuButtonEnum, MenuSetting } from '@/shared'
import { LocaleEnum, MenuPositionEnum, ThemeModeEnum } from '@/shared'
import { darkMode, localeSetting, menuSetting, version } from '@/setting/appSetting'
import { deepMergeObjects, typedLocalStorage, updateLocale, updateThemeMode } from '@/utils'
import { availableLocales } from '@/modules/i18n'
import type { DeepPartial } from '@/shared/types'

export const APP_SETTING_VERSION = '__APP__SETTING__VERSION__'
export const APP_THEME_SCHEMA_KEY = '__APP__DARK__MODE__'
export const APP_LOCALE_KEY = '__APP__LOCALE__MODE__'
export const APP_MENU_KEY = '__APP__MENU__SETTING__'

/**
 * Application basic settings
 * 应用的基础设置
 */
interface AppSettingState {
  /** Application setting version 应用设置版本 */
  version?: string
  /** Theme mode 主题模式 */
  themeMode?: ThemeModeEnum
  /** Locale settings 本地化设置 */
  localeSetting?: LocaleSetting
  /** Menu settings 菜单设置 */
  menuSetting?: MenuSetting
  /** Is mobile device 是否移动端 */
  isMobile: boolean
}

export const useAppStore = defineStore('appSetting', {
  state: (): AppSettingState => ({
    version: undefined,
    themeMode: undefined,
    localeSetting: undefined,
    menuSetting: undefined,
    isMobile: false,
  }),
  getters: {
    /** Raw theme mode (original configuration: dark, light, system) 主题模式(原始配置 dark light system) */
    ThemeModeRaw(state): ThemeModeEnum {
      // Verify version cache 验证版本缓存
      if ((this.version || typedLocalStorage.getItem(APP_SETTING_VERSION)) !== version) {
        typedLocalStorage.removeItems(APP_THEME_SCHEMA_KEY, APP_LOCALE_KEY, APP_MENU_KEY)
        this.version = version
        typedLocalStorage.setItem(APP_SETTING_VERSION, version)
      }

      return state.themeMode || typedLocalStorage.getItem(APP_THEME_SCHEMA_KEY) || darkMode
    },
    /** Theme mode (system will convert to dark or light) 主题模式(system会根据转为dark或light) */
    ThemeMode(): ThemeModeEnum {
      const mode = this.ThemeModeRaw
      const darkOsTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      return mode === ThemeModeEnum.SYSTEM ? (darkOsTheme ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT) : mode
    },
    /** Is dark mode 是否深色模式 */
    IsDarkMode(): boolean {
      return this.ThemeMode === ThemeModeEnum.DARK
    },
    /** Locale settings 本地化设置 */
    LocaleSetting(state): LocaleSetting {
      // Verify version cache 验证版本缓存
      if ((this.version || typedLocalStorage.getItem(APP_SETTING_VERSION)) !== version) {
        typedLocalStorage.removeItems(APP_THEME_SCHEMA_KEY, APP_LOCALE_KEY, APP_MENU_KEY)
        this.version = version
        typedLocalStorage.setItem(APP_SETTING_VERSION, version)
      }

      const setting = state.localeSetting || typedLocalStorage.getItem(APP_LOCALE_KEY) || localeSetting
      if (!setting.locale)
        // Default to use browser language 默认使用浏览器语言
        setting.locale = navigator.language.includes('zh') ? LocaleEnum.zhCN : LocaleEnum.enUS
      return setting
    },
    /** Menu settings 菜单设置 */
    MenuSetting(state): MenuSetting {
      // Verify version cache 验证版本缓存
      if ((this.version || typedLocalStorage.getItem(APP_SETTING_VERSION)) !== version) {
        typedLocalStorage.removeItems(APP_THEME_SCHEMA_KEY, APP_LOCALE_KEY, APP_MENU_KEY)
        this.version = version
        typedLocalStorage.setItem(APP_SETTING_VERSION, version)
      }

      const mset = state.menuSetting || typedLocalStorage.getItem(APP_MENU_KEY) || menuSetting
      if (!mset.menuState) {
        if (mset.mainMenu.collapsed && mset.mainMenu.showLabel) {
          mset.menuState = 1
        }
        else if (mset.mainMenu.collapsed && !mset.mainMenu.showLabel) {
          mset.menuState = 2
        }
        else if (!mset.mainMenu.collapsed) {
          mset.menuState = 3
        }
      }
      return mset
    },
  },
  actions: {
    /** Set theme mode 设置主题模式 */
    setThemeMode(mode: ThemeModeEnum) {
      this.themeMode = mode
      typedLocalStorage.setItem(APP_THEME_SCHEMA_KEY, this.themeMode)
      updateThemeMode(unref(this.ThemeMode))
    },
    /** Toggle dark mode 切换主题模式 */
    toggleThemeMode() {
      this.setThemeMode(this.IsDarkMode ? ThemeModeEnum.LIGHT : ThemeModeEnum.DARK)
    },
    /** Set locale settings 设置本地化设置 */
    async setLocaleSetting(setting: Partial<LocaleSetting>) {
      this.localeSetting = deepMergeObjects(this.LocaleSetting, setting)
      typedLocalStorage.setItem(APP_LOCALE_KEY, this.localeSetting)
      updateLocale(this.localeSetting)
    },
    /** Toggle language 切换语言 */
    toggleLanguage(lang?: string) {
      const currentIndex = availableLocales.indexOf(lang ?? this.LocaleSetting.locale!)
      const nextIndex = lang ? currentIndex : (currentIndex + 1) % availableLocales.length
      this.setLocaleSetting({ locale: availableLocales[nextIndex] })
    },
    /** Set menu settings 设置菜单设置 */
    setMenuSetting(menuSettings: DeepPartial<MenuSetting>) {
      this.menuSetting = deepMergeObjects(this.MenuSetting, menuSettings)
      typedLocalStorage.setItem(APP_MENU_KEY, this.menuSetting)
    },
    /** Toggle menu position 切换菜单位置 */
    toggleMenuPosition() {
      if (this.MenuSetting.menuPosition === MenuPositionEnum.SIDEBAR)
        this.setMenuSetting({ menuPosition: MenuPositionEnum.TOP_BAR, topMenu: { showSubMenu: true } })
      else if (this.MenuSetting.topMenu.showSubMenu)
        this.setMenuSetting({ menuPosition: MenuPositionEnum.TOP_BAR, topMenu: { showSubMenu: false } })
      else this.setMenuSetting({ menuPosition: MenuPositionEnum.SIDEBAR })
    },
    /** Toggle main menu state 切换主栏菜单状态 */
    toggleMainMenuState() {
      if (this.isMobile)
        this.setMenuSetting({ mainMenu: { collapsed: !this.MenuSetting.mainMenu.collapsed } })
      else if (this.MenuSetting.menuState === 1)
        this.setMenuSetting({ mainMenu: { collapsed: true, showLabel: false }, menuState: 2 })
      else if (this.MenuSetting.menuState === 2)
        this.setMenuSetting({ mainMenu: { collapsed: false, showLabel: false }, menuState: 3 })
      else if (this.MenuSetting.menuState === 3)
        this.setMenuSetting({ mainMenu: { collapsed: true, showLabel: true }, menuState: 1 })
    },
    /** Check if menu button exists display list 检查菜单按钮是否存在于显示列表 */
    hasMenuButton(button: MenuButtonEnum) {
      return this.MenuSetting.buttons.includes(button)
    },
    /** Set mobile status 设置是否为移动设备 */
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile
      const mset = this.MenuSetting
      if (isMobile && !(mset.mainMenu.collapsed && !mset.subMenu.collapsed))
        this.setMenuSetting({ mainMenu: { collapsed: true }, subMenu: { collapsed: false } })
      // Fix the menu status abnormal when switching back and forth between mobile UI
      // 用于修复来回切换手机UI时菜单状态异常
      else if (mset.menuState === 1 && !(mset.mainMenu.collapsed && mset.mainMenu.showLabel))
        this.setMenuSetting({ mainMenu: { collapsed: true, showLabel: true }, menuState: 1 })
      else if (mset.menuState === 2 && !(mset.mainMenu.collapsed && !mset.mainMenu.showLabel))
        this.setMenuSetting({ mainMenu: { collapsed: true, showLabel: false }, menuState: 2 })
      else if (mset.menuState === 3 && !(!mset.mainMenu.collapsed && !mset.mainMenu.showLabel))
        this.setMenuSetting({ mainMenu: { collapsed: false, showLabel: false }, menuState: 3 })
    },
  },
})

// HMR hot reload HMR热重载
import.meta.hot?.accept(acceptHMRUpdate(useAppStore, import.meta.hot))

/**
 * Initialize Application Settings
 * 初始化应用设置
 */
export function initAppSetting() {
  const app = useAppStore()

  updateThemeMode(app.ThemeMode)

  updateLocale(app.LocaleSetting)
}

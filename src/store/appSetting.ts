import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LocaleSetting, MenuButtonEnum, MenuSetting } from '@/shared'
import { DarkSchemeEnum, LocaleEnum, MenuPositionEnum } from '@/shared'
import { localeSetting as localDefault, menuSetting as menuDefault } from '@/setting/appSetting'
import { deepMergeObjects, typedLocalStorage, updateLocale, updateThemeMode } from '@/utils'
import type { DeepPartial } from '@/shared/types'

export const useAppSettingStore = defineStore('appSetting', () => {
  /** Dark scheme: Includes light, dark, and auto. 主题方案：包括 light、dark 和 auto。 */
  const darkScheme = computed(() => typedLocalStorage.getItem<DarkSchemeEnum>(APP_DARK_SCHEMA_KEY))

  /**
   * Dark mode: Excludes "auto". When theme-scheme is set to "auto", it will return the theme-mode of the operating system.
   * 主题模式：不包括 auto。当 theme-scheme 设置为 auto 时，将返回操作系统的主题模式。
   */
  const darkMode = computed(() => {
    if (darkScheme.value === DarkSchemeEnum.AUTO)
      return preferredDark.value ? DarkSchemeEnum.DARK : DarkSchemeEnum.LIGHT
    else return darkScheme.value
  })

  const { isSupported, language } = useNavigatorLanguage()

  /** Locale setting. 区域设置。 */
  const localeSetting = computed(() => {
    const setting = typedLocalStorage.getItem<LocaleSetting>(APP_LOCALE_KEY) || localDefault

    // Default to use browser language 默认使用浏览器语言
    if (!setting.locale && isSupported.value)
      setting.locale = language.value

    return setting
  })

  /** Menu settings 菜单设置 */
  const menuSetting = computed(() => {
    const mset = typedLocalStorage.getItem<MenuSetting>(APP_MENU_KEY) || menuDefault
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
  })

  /** Set locale settings 设置本地化设置 */
  function setLocaleSetting(setting: Partial<LocaleSetting>) {
    const currSetting = deepMergeObjects(localeSetting.value, setting)
    typedLocalStorage.setItem(APP_LOCALE_KEY, currSetting)
    updateLocale(localeSetting.value)
  }

  /** Set menu settings 设置菜单设置 */
  function setMenuSetting(setting: DeepPartial<MenuSetting>) {
    const currSetting = deepMergeObjects(menuSetting.value, setting)
    typedLocalStorage.setItem(APP_MENU_KEY, currSetting)
  }

  /** Check if menu button exists display list 检查菜单按钮是否存在于显示列表 */
  function hasMenuButton(button: MenuButtonEnum) {
    return menuSetting.value.buttons.includes(button)
  }

  return { themeScheme: darkScheme, themeMode: darkMode, localeSetting, menuSetting, setLocaleSetting, setMenuSetting, hasMenuButton }
})

// HMR hot reload HMR热重载
import.meta.hot?.accept(acceptHMRUpdate(useAppSettingStore, import.meta.hot))

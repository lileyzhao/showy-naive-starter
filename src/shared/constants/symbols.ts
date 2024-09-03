export const MAIN_MENU_KEY = Symbol('mainMenuKey') as InjectionKey<string>
export const SUB_MENU_KEY = Symbol('subMenuKey') as InjectionKey<string>
export const SUB_MENU_COUNT = Symbol('subMenuCount') as InjectionKey<Ref<number>>
export const UPDATE_SUB_MENU_COUNT = Symbol('updateSubMenuCount') as InjectionKey<(count: number) => void>

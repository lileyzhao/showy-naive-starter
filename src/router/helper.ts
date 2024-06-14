import type { AppRouteRecordRaw } from '@/shared/types'

const dynamicViewsModules: Record<string, () => Promise<Recordable>> = import.meta.glob('@/views/**/*.{vue,tsx}')

/** Dynamic import component function 动态导入组件函数 */
export const dynamicImport = (component: string) => {
  // 获取所有视图模块的键（路径）
  const keys = Object.keys(dynamicViewsModules)

  // 过滤出与给定组件路径匹配的键
  const matchKeys = keys.filter((key) => {
    // 去掉路径中的 '../views' 部分 和 去掉扩展名部分
    const k = key.replace(/.*?(views\/)/, '').replace(/(\.vue|\.tsx)$/, '')
    // 返回是否匹配给定组件路径
    return k === component.replace(/.*?(views\/)/, '').replace(/(\.vue|\.tsx)$/, '')
  })

  // 如果找到唯一一个匹配项，返回对应的导入函数
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }

  // 如果找到多个匹配项，发出警告
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    )
  }
}

// Dynamic introduction of views (support for subdirectories) 动态引入视图（支持子目录）
export function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  console.log(dynamicViewsModules)
  if (!routes)
    return
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME'
    }
    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = undefined // LayoutMap.get(component as string)
      if (layoutFound) {
        item.component = layoutFound
      }
      else {
        item.component = dynamicImport(dynamicViewsModules, component as string)
      }
    }
    else if (name) {
      item.component = undefined // getParentLayout()
    }
    children && asyncImportRoute(children)
  })
}

export function dynamicImport2(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  else if (matchKeys?.length > 1) {
    // warn(
    //   'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    // )
  }
  else {
    // warn(`在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`)
    // return EXCEPTION_COMPONENT
  }
}

// Dynamic import of view modules 动态导入视图模块
export const dynamicViewsModules: Record<string, () => Promise<Recordable>> = import.meta.glob('@/views/**/*.{vue,tsx}')

// Add built-in pages 添加内置的页面
export const builtInViews: Record<string, () => Promise<Recordable>> = import.meta.glob('@/layout/built-in/**/*.{vue,tsx}')

// Merge built-in views into dynamic view modules 合并内置页面到动态视图模块
Object.assign(dynamicViewsModules, builtInViews)

console.log('%c 组件表 ', 'color:white;background-color:blue;', dynamicViewsModules)

// Cache the matching results 缓存匹配结果
const matchCache = new Map<string, () => Promise<Record<string, any>>>()

/** Dynamic import component function 动态导入组件函数 */
export const dynamicImport = (component: string) => {
  // Check the cache 检查缓存
  if (matchCache.has(component)) {
    return matchCache.get(component)
  }

  // Normalize the path and filter matching keys 处理路径并过滤匹配项
  const normalizedComponent = component.replace(/.*?(views\/)/, '').replace(/.*?(layout\/built-in\/)/, '').replace(/(\.vue|\.tsx)$/, '')
  const matchKeys = Object.keys(dynamicViewsModules).filter((key) => {
    const normalizedKey = key.replace(/.*?(views\/)/, '').replace(/.*?(layout\/built-in\/)/, '').replace(/(\.vue|\.tsx)$/, '')
    return normalizedKey === normalizedComponent
  })

  // Cache and return the import function if a unique match is found
  // 如果找到唯一一个匹配项，缓存并返回对应的导入函数
  if (matchKeys.length === 1) {
    const matchKey = matchKeys[0]
    const matchedModule = dynamicViewsModules[matchKey]
    matchCache.set(component, matchedModule)
    return matchedModule
  }

  // Issue a warning if multiple matches are found 如果找到多个匹配项，发出警告
  if (matchKeys.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.tsx` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure. '
      + '请不要在views文件夹下的同一层级目录中创建相同文件名的`.vue`和`.tsx`文件，这会导致动态引入失败。',
    )
  }
  // Issue a warning if no match is found 如果没有找到匹配项，发出警告
  else {
    console.warn(
      `Cannot find \`${component}.vue\` or \`${component}.tsx\` under src/views/, please create it yourself! `
      + `在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`,
    )
  }
}

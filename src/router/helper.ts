// Built-in pages 内置的页面
const builtInViews: Record<string, () => Promise<Recordable>> = import.meta.glob('@/layout/built-in/**/*.{vue,tsx}')

// Dynamic import of view modules 动态导入视图模块
const userViews: Record<string, () => Promise<Recordable>> = import.meta.glob('@/views/**/*.{vue,tsx}')

// Merge built-in views into dynamic view 合并内置页面到动态视图
export const dynamicViews = { ...builtInViews, ...userViews }

console.log('%c 组件表 ', 'color:white;background-color:blue;', dynamicViews)

// Cache the matching results 缓存匹配结果
const matchCache = new Map<string, () => Promise<Record<string, any>>>()

/** Dynamic import component function 动态导入组件函数 */
export const dynamicImport = (component: string) => {
  // Check the cache 检查缓存
  if (matchCache.has(component)) {
    return matchCache.get(component)
  }

  // Normalize the path and filter matching keys 处理路径并过滤匹配项
  const normalizedComponent = component
    .replace(/.*?(views\/)/, '')
    .replace(/.*?(layout\/built-in\/)/, '')
    .replace(/(\.vue|\.tsx)$/, '')
  const matchKeys = Object.keys(dynamicViews).filter((key) => {
    const normalizedKey = key
      .replace(/.*?(views\/)/, '')
      .replace(/.*?(layout\/built-in\/)/, '')
      .replace(/(\.vue|\.tsx)$/, '')
    return normalizedKey === normalizedComponent
  })

  // Cache and return the import function if a unique match is found
  // 如果找到匹配项，缓存并返回对应的导入函数
  if (matchKeys.length >= 1) {
    if (matchKeys.length > 1) {
      // Issue a warning if multiple matches are found 如果找到多个匹配项，发出警告
      console.warn(
        `Multiple matches found for component "${component}": ${matchKeys.join('\n')}. Defaulting to the first match: "${matchKeys[0]}". `,
        +`组件 "${component}" 找到多个匹配项：${matchKeys.join('\n')}。 默认使用第一个匹配项: "${matchKeys[0]}"。`,
      )
    }

    const matchKey = matchKeys[0]
    const matchedModule = dynamicViews[matchKey]
    matchCache.set(component, matchedModule)
    return matchedModule
  }
  else {
    // Issue a warning if no match is found 如果没有找到匹配项，发出警告
    console.warn(
      `Cannot find \`${component}.vue\` or \`${component}.tsx\` under src/views/, please create it yourself! `
      + `在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`,
    )
    const matchedModule = dynamicViews.MISSING
    matchCache.set(component, matchedModule)
    return matchedModule
  }
}

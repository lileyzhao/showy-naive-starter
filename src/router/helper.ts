const dynamicViewsModules: Record<string, () => Promise<Recordable>> = import.meta.glob('@/views/**/*.{vue,tsx}')

dynamicViewsModules['400'] = () => import('@/layout/built-in/400.vue')
dynamicViewsModules['403'] = () => import('@/layout/built-in/403.vue')
dynamicViewsModules['404'] = () => import('@/layout/built-in/404.vue')
dynamicViewsModules['409'] = () => import('@/layout/built-in/409.vue')
dynamicViewsModules['500'] = () => import('@/layout/built-in/500.vue')

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
  // 如果没有找到匹配项，发出警告
  else {
    console.warn(`在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`)
  }
}

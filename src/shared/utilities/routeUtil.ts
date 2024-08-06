export function getFullRoutes() {
  const router = useRouter()
  return router.getRoutes().map((route) => {
    // Remove dynamic segments from route paths. 从路由路径中移除动态段。
    route.path = route.path.replace(/:[^/?]+(\?|\/|$)\/?/g, '')
    return route
  })
}

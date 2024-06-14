/**
 * Check if the given HTML element contains a specified class name.
 * 判断给定的 HTML 元素是否包含指定的类名。
 *
 * @param element HTML element object HTML. 元素对象。
 * @param className The class name to check. 要检查的类名。
 * @returns Returns true if the element contains the specified class name, otherwise false.
 *          如果元素包含指定类名则返回 true，否则返回 false。
 */
export function hasClass(element: Element, className: string): boolean {
  if (!element || !className || className.trim() === '')
    return false

  if (element.classList)
    return element.classList.contains(className)
  else return element.className.split(' ').includes(className)
}

/**
 * Add a class name to an HTML element while preserving the existing class names.
 * 向 HTML 元素添加一个类名，同时保留原有的类名。
 *
 * @param element HTML element object HTML. 元素对象。
 * @param classNamesToAdd The class names to add, can be one or multiple separated by spaces.
 *                        要添加的类名，可以是一个或多个，用空格分隔。
 */
export function addClass(element: Element, classNamesToAdd: string): void {
  if (!element || !classNamesToAdd || classNamesToAdd.trim() === '')
    return

  const classNames = classNamesToAdd.split(' ').filter(str => str.trim() !== '')

  if (element.classList) {
    classNames.forEach((className) => {
      element.classList.add(className)
    })
  }
  else if (element.className) {
    const existingClasses = element.className.split(' ').filter(str => str.trim() !== '')
    classNames.forEach((cls) => {
      if (!existingClasses.includes(cls))
        element.className += ` ${cls}`
    })
  }
  else {
    element.className = classNamesToAdd
  }
}

/**
 * Remove one or multiple class names from an HTML element while preserving the remaining class names.
 * 从 HTML 元素中移除一个或多个类名，同时保留其他类名。
 *
 * @param element HTML element object HTML. 元素对象。
 * @param classNamesToRemove The class names to remove, can be one or multiple separated by spaces.
 *                           要移除的类名，可以是一个或多个，用空格分隔。
 */
export function removeClass(element: HTMLElement | null, classNamesToRemove: string): void {
  if (!element || !classNamesToRemove || classNamesToRemove.trim() === '')
    return

  const classNames = classNamesToRemove.split(' ').filter(str => str.trim() !== '')

  if (element.classList) {
    classNames.forEach((className) => {
      element.classList.remove(className)
    })
  }
  else if (element.className) {
    const existingClasses = element.className.split(' ').filter(str => str.trim() !== '')

    element.className = existingClasses.filter(className => !classNames.includes(className)).join(' ')
  }
}

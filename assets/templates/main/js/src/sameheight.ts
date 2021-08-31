import { isMobile } from './helpers'

export const sameHeight = (selector: string) => {
  const elements = document.querySelectorAll(selector)

  elements.forEach((element) => {
    // @ts-ignore
    element.style.height = 'auto'
  })

  if (isMobile()) {
    elements.forEach((element) => {
      // @ts-ignore
      element.style.height = 'auto'
    })
  } else {
    // console.log(elements);
    // console.log(elements.map);
    
    let maxHeight = 0
    elements.forEach((element) => {
      // @ts-ignore
      maxHeight = element.offsetHeight > maxHeight ? element.offsetHeight : maxHeight
    })
    // const maxHeight = Math.max(elements.map((element) => element.offsetHeight))
    elements.forEach((element) => {
      // @ts-ignore
      element.style.height = `${maxHeight}px`
    })
  }
}

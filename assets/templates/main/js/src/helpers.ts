export const getWindowWidth = () => {
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  return iOS ? screen.width : window.innerWidth
}

export const isObject = <T>(variable: T) => {
  return typeof variable === 'object' && variable !== null
}

export const isMobile = () => {
  return window.innerWidth < 768
}

export const isDesktop = () => {
  return window.innerWidth >= 1200
}

export const getWindowWidth = () => {
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  return iOS ? screen.width : window.innerWidth
}

export const isObject = (variable: any) => {
  return typeof variable === 'object' && variable !== null
}

export const isMobile = () => {
  return (window.innerWidth < 576)
}

export const isTablet = () => {
  return (window.innerWidth < 993)
}

export const isWide = () => {
  return (window.innerWidth >= 1500)
}

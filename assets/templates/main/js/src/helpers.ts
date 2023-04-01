/* eslint-disable @typescript-eslint/ban-ts-comment */

export const getWindowWidth = () => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    // @ts-ignore
    !window.MSStream

    // eslint-disable-next-line no-restricted-globals
    return iOS ? screen.width : window.innerWidth
}

export const isObject = <T>(variable: T) => typeof variable === 'object' && variable !== null

export const isMobile = () => window.innerWidth < 768

export const isDesktop = () => window.innerWidth >= 1200

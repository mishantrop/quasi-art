import { isMobile } from './helpers'

export const sameHeight = (selector: string) => {
    const elements = document.querySelectorAll<HTMLElement>(selector)

    elements.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.style.height = 'auto'
    })

    if (isMobile()) {
        elements.forEach((element) => {
            // eslint-disable-next-line no-param-reassign
            element.style.height = 'auto'
        })
    } else {
        let maxHeight = 0
        elements.forEach((element) => {
            maxHeight = element.offsetHeight > maxHeight ? element.offsetHeight : maxHeight
        })
        elements.forEach((element) => {
            // eslint-disable-next-line no-param-reassign
            element.style.height = `${maxHeight}px`
        })
    }
}

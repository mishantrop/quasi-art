import scrollToElement from 'scroll-to-element'

export const initBackToTopScroll = ({
    targetSelector,
}: {
    targetSelector: string;
}) => {
    const backToTopSelector = '.back-to-top'
    const backToTopClassActive = 'back-to-top--active'
    const scrollTrigger = 300
    const backToTop = document.querySelector(backToTopSelector)
    if (!backToTop) {
        console.warn('backToTop not found')
        return
    }

    if (window.scrollY > scrollTrigger) {
        backToTop.classList.add(backToTopClassActive)
    } else {
        backToTop.classList.remove(backToTopClassActive)
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollTrigger) {
            backToTop.classList.add(backToTopClassActive)
        } else {
            backToTop.classList.remove(backToTopClassActive)
        }
    })

    const el = document.querySelector(targetSelector) || false
    if (el) {
        console.warn('target not found: ', targetSelector)
        return
    }
    backToTop.addEventListener('click', () => {
        scrollToElement(targetSelector)
    })
}

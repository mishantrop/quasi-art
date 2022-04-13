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
  if (backToTop) {
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
      backToTop.addEventListener('click', () => {
        scrollToElement(targetSelector)
      })
    } else {
      console.log('target not found: ', targetSelector)
    }
  } else {
    console.log('backToTop not found')
  }
}

import { initBackToTopScroll } from './backtotop'
import { initLightbox } from './lightbox'
import { sameHeight } from './sameheight'
import { initResume } from './resume'
import { getWindowWidth } from './helpers'
import Navigation from './navigation'

const detectAdBlock = () => {
  if ('AdBlocking' in window) {
    console.log('Никаких блокировщиков рекламы не установлено')
  } else {
    console.log('Установлен блокировщик рекламы')
  }
}

// @ts-ignore
window.windowInnerWidth = null

const sameHeightWithResize = (selector: string) => {
  sameHeight(selector)
  window.addEventListener('resize', () => {
    const ww = getWindowWidth()
    // @ts-ignore
    if (window.windowInnerWidth !== null && ww === window.windowInnerWidth) {
      return false
    }
    // @ts-ignore
    window.windowInnerWidth = ww
    sameHeight(selector)
  })
}

const init = () => {
  detectAdBlock()
  initResume()
  initBackToTopScroll()
  const navigation = new Navigation() // eslint-disable-line no-unused-vars

  // Главная страница / Работы портфолио
  sameHeightWithResize('.portfolio-item__info-title')

  // Портфолио / Работа / Галерея
  const portfolioContainer = document.querySelector('.portfoilo-inner-item__images-wrapper')
  if (portfolioContainer) {
    // @ts-ignore
    imagesLoaded(portfolioContainer, () => { // eslint-disable-line no-undef
      sameHeightWithResize('.portfoilo-inner-item__images-wrapper figure')
      sameHeightWithResize('.portfoilo-inner-item__images-wrapper figcaption')
    })
  }

  initLightbox()
  if ('hljs' in window) {
    hljs.initHighlightingOnLoad() // eslint-disable-line no-undef
  }

  const contactsFormOptions = {
    hideFormOnSuccess: false,
    selector: '#contacts-form-wrapper',
    callbackOnSuccess: (data: any) => {
      console.log('callbackOnSuccess')
      console.log(data)
      const messagesWrapper = document.querySelector('[data-quasiform="messages"]')
      // @ts-ignore
      messagesWrapper.style.display = 'block'
      messagesWrapper.innerHTML = '<ul><li>Сообщение успешно отправлено</li></ul>'
      setTimeout(() => {
        // @ts-ignore
        messagesWrapper.style.display = 'none'
      }, 10000)
    },
    callbackOnFail: (data: any) => {
      console.log('callbackOnFail')
      console.log(data)
    },
  }

  // eslint-disable-next-line no-unused-vars
// @ts-ignore
  const contactsForm = new window.quasiform.Quasiform(contactsFormOptions)
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}

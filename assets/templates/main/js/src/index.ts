/* eslint-disable @typescript-eslint/ban-ts-comment */
import hljs from 'highlight.js/lib/core'
import hljsJavaScript from 'highlight.js/lib/languages/javascript'
import hljsTypeScript from 'highlight.js/lib/languages/typescript'
import hljsCss from 'highlight.js/lib/languages/css'
import hljsPHP from 'highlight.js/lib/languages/php'
import imagesLoaded from 'imagesloaded'

import { initBackToTopScroll } from './backtotop'
import { initLightbox } from './lightbox'
import { sameHeight } from './sameheight'
import { initResume } from './resume'
import { getWindowWidth } from './helpers'
import { Navigation } from './navigation'

const detectAdBlock = () => {
    if ('AdBlocking' in window) {
        // eslint-disable-next-line no-console
        console.log('Никаких блокировщиков рекламы не установлено')
    } else {
        // eslint-disable-next-line no-console
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
            return
        }
        // @ts-ignore
        window.windowInnerWidth = ww
        sameHeight(selector)
    })
}

const init = () => {
    detectAdBlock()
    initResume()
    initBackToTopScroll({ targetSelector: '.menu' })
    const navigation = new Navigation()
    navigation.init()

    // Главная страница / Работы портфолио
    sameHeightWithResize('.portfolio-item__info-title')

    // Портфолио / Работа / Галерея
    const portfolioContainer = document.querySelector('.portfoilo-inner-item__images-wrapper')
    if (portfolioContainer) {
    // @ts-ignore
        imagesLoaded(portfolioContainer, () => {
            sameHeightWithResize('.portfoilo-inner-item__images-wrapper figure')
            sameHeightWithResize('.portfoilo-inner-item__images-wrapper figcaption')
        })
    }

    initLightbox()

    hljs.registerLanguage('javascript', hljsJavaScript)
    hljs.registerLanguage('typescript', hljsTypeScript)
    hljs.registerLanguage('css', hljsCss)
    hljs.registerLanguage('php', hljsPHP)
    hljs.initHighlightingOnLoad()

    const contactsFormOptions = {
        hideFormOnSuccess: false,
        selector: '#contacts-form-wrapper',
        callbackOnSuccess: () => {
            // console.log('callbackOnSuccess')
            // console.log(data)
            const messagesWrapper: HTMLElement = document.querySelector('[data-quasiform="messages"]')
            messagesWrapper.style.display = 'block'
            messagesWrapper.innerHTML = '<ul><li>Сообщение успешно отправлено</li></ul>'
            setTimeout(() => {
                messagesWrapper.style.display = 'none'
            }, 10000)
        },
        callbackOnFail: (data: unknown) => {
            // console.log('callbackOnFail')
            console.error(data)
        },
    }

    if ('quasiform' in window) {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const contactsForm = new (<unknown>window.quasiform).Quasiform(contactsFormOptions)
    }
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
    init()
} else {
    document.addEventListener('DOMContentLoaded', init)
}

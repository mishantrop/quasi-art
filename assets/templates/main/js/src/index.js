'use strict';

import quasiform from 'quasiform'; //eslint-disable-line no-unused-vars
import { initBackToTopScroll } from './backtotop';
import { initLightbox } from './lightbox.js';
import { sameHeight } from './sameheight';
import { initResume } from './resume';
import { getWindowWidth } from './helpers';
import Navigation from './navigation';

const detectAdBlock = () => {
  if ('AdBlocking' in window) {
    console.log('Никаких блокировщиков рекламы не установлено');
  } else {
    console.log('Установлен блокировщик рекламы');
  }
};

window.windowInnerWidth = null;

const init = () => {
  detectAdBlock();
  initResume();
  initBackToTopScroll();
  const navigation = new Navigation();

  sameHeight('.article-item');
  window.addEventListener('resize', () => {
    const ww = getWindowWidth();
    if (window.windowInnerWidth !== null && ww === window.windowInnerWidth) {
      return false;
    }
    window.windowInnerWidth = ww;
    sameHeight('.article-item');
  });

  const portfolioContainer = document.querySelector('.portfoilo-inner-item__images-wrapper') || false;
  if (portfolioContainer) {
    imagesLoaded(portfolioContainer, () => { // eslint-disable-line no-undef
      sameHeight('.portfoilo-inner-item__images-wrapper figure');
      window.addEventListener('resize', () => {
        const ww = getWindowWidth();
        if (window.windowInnerWidth !== null && ww === window.windowInnerWidth) {
          return false;
        }
        window.windowInnerWidth = ww;
        sameHeight('.portfoilo-inner-item__images-wrapper figure');
      });
    });
  }

  const boxesContainer = document.querySelector('.box-wrapper') || false;
  if (boxesContainer) {
    imagesLoaded(boxesContainer, () => { // eslint-disable-line no-undef
      sameHeight('.box-item');
      sameHeight('.box-item__info-title-link');
      window.addEventListener('resize', () => {
        const ww = getWindowWidth();
        if (window.windowInnerWidth !== null && ww === window.windowInnerWidth) {
          return false;
        }
        window.windowInnerWidth = ww;
        sameHeight('.box-item');
        sameHeight('.box-item__info-title-link');
      });
    });
  }

  /**
   * Заголовки у блоков портфолио
   */
  sameHeight('.portfolio-item__info-title');
  window.addEventListener('resize', () => {
    const ww = getWindowWidth();
    if (window.windowInnerWidth !== null && ww === window.windowInnerWidth) {
      return false;
    }
    window.windowInnerWidth = ww;
    sameHeight('.portfolio-item__info-title');
  });

  initLightbox();
  if ('hljs' in window) {
    hljs.initHighlightingOnLoad(); // eslint-disable-line no-undef
  }

  let optionsContactsForm = {
    hideFormOnSuccess: true,
    selector: '#contacts-form-wrapper',
  };
  let contactsForm = new quasiform(optionsContactsForm);
};

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

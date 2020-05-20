'use strict';

import { isElements } from './helpers';

const sameHeight = (selector) => {
  const windowWidth = window.innerWidth;
  const elements = document.querySelectorAll(selector) || false;
  if (isElements) {
    elements.forEach((e) => {
      e.style.height = 'auto';
    });
    if (windowWidth >= 576) {
      let maxHeight = 0;
      elements.forEach((e) => {
        maxHeight = e.offsetHeight > maxHeight ? e.offsetHeight : maxHeight;
      });
      if (maxHeight > 0) {
        elements.forEach((e, i) => {
          elements[i].style.height = `${maxHeight}px`;
        });
      }
    } else {
      elements.forEach((e, i) => {
        elements[i].style.height = 'auto';
      });
    }
  }
};

export {
  sameHeight,
};

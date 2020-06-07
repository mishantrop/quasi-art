import { isMobile } from './helpers';

export const sameHeight = (selector) => {
  const elements = [ ...document.querySelectorAll(selector) ];

  elements.forEach((element) => {
    element.style.height = 'auto';
  });

  if (isMobile()) {
    elements.forEach((element) => {
      element.style.height = 'auto';
    });
  } else {
    const maxHeight = Math.max(elements.map((element) => element.offsetHeight));
    elements.forEach((element) => {
      element.style.height = `${maxHeight}px`;
    });
  }
};

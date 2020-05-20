import scrollToElement from 'scroll-to-element';

const initResume = () => {
  const buttonWrite = document.getElementById('resume-header__write');
  if (buttonWrite) {
    buttonWrite.addEventListener('click', (e) => {
      const targetSelector = buttonWrite.getAttribute('data-target');
      const target = document.querySelector(targetSelector);
      if (target) {
        scrollToElement(targetSelector);
        e.preventDefault();
      }
    });

    buttonWrite.addEventListener('mousemove', (e) => {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;

      e.target.style.setProperty('--x', `${ x }px`);
      e.target.style.setProperty('--y', `${ y - 60 }px`);
    });
  }
};

export {
  initResume,
};

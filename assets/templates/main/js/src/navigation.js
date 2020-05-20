'use strict';

export default class Navigation {
  constructor() {
    this.state = {
      isOpen: !this.isMobileNavigation(),
    };

    this.menuToggler = document.querySelector('#nav-toggle');
    this.iconClosed = document.querySelector('.navbar-icon--closed');
    this.iconOpened = document.querySelector('.navbar-icon--opened');
    this.navToggle = document.querySelector('#nav-toggle');
    this.navbarToggler = document.querySelector('.navbar-toggler');
    this.navbarTogglerIcon = this.navbarToggler.querySelector('i');
    this.exCollapsingNavbar2 = document.getElementById('exCollapsingNavbar2');

    this.init();
  }

  setState(patch) {
    this.state = Object.assign(this.state, patch);
    this.render();
  };

  init() {
    if (this.menuToggler && this.exCollapsingNavbar2) {
      if (this.menuToggler.style.display !== 'none') {
        this.exCollapsingNavbar2.classList.remove('in');
      }
    }

    if (this.navToggle) {
      this.navToggle.addEventListener('click', (e) => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
        e.preventDefault();
      });
    }

    window.addEventListener('resize', () => {
      /**
       * Если из мобилы перешли в десктоп, то нужно развернуть менюшку
       */
      const { isOpen } = this.state;
      this.setState({
        isOpen: isOpen == this.isMobileNavigation(),
      });
    });

    this.render();
  }

  isMobileNavigation() {
    return +window.innerWidth <= 768;
  };

  render() {
    const { isOpen } = this.state;

    if (!isOpen) {
      this.navToggle.classList.remove('active');
      this.iconClosed.style.display = 'block';
      this.iconOpened.style.display = 'none';
      this.exCollapsingNavbar2.classList.remove('in');
      document.querySelector('body').style.overflow = 'unset';
    } else {
      this.navToggle.classList.add('active');
      this.iconClosed.style.display = 'none';
      this.iconOpened.style.display = 'block';
      this.exCollapsingNavbar2.classList.add('in');
      if (this.isMobileNavigation()) {
        document.querySelector('body').style.overflow = 'hidden';
      }
    }
  }
}

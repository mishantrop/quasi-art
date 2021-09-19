import { isMobile } from './helpers'

interface State {
  isOpened: boolean;
  isMobile: boolean;
}

export class Navigation {
  state: State
  menuNav: HTMLDivElement
  menuToggler: HTMLDivElement
  iconClosed: HTMLDivElement
  iconOpened: HTMLDivElement
  navbarTogglerIcon: HTMLElement

  setState(patch: Partial<State>) {
    this.state = { ...this.state, ...patch }
    this.render()
  }

  init() {
    this.state = {
      isOpened: false,
      isMobile: this.isMobileScreen(),
    }

    this.menuNav = document.querySelector('.menu-nav')
    this.menuToggler = document.querySelector('#menu-toggler')
    this.iconClosed = document.querySelector('.menu-icon--closed')
    this.iconOpened = document.querySelector('.menu-icon--opened')
    this.navbarTogglerIcon = this.menuToggler.querySelector('i')

    this.menuToggler.addEventListener('click', () => {
      const { isOpened } = this.state
      this.setState({ isOpened: !isOpened })
    })

    this.render()

    window.addEventListener('resize', () => {
      const isMobileScreen = this.isMobileScreen()
      this.setState({
        isMobile: isMobileScreen,
        isOpened: isMobileScreen ? false : this.state.isOpened
      })
      this.render()
    })
  }

  isMobileScreen() {
    return isMobile()
  }

  render() {
    const { isOpened, isMobile } = this.state

    if (isOpened && isMobile) {
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('body').style.overflow = 'unset'
    }

    if (isOpened) {
      this.menuNav.classList.add('menu-nav--opened')
      this.menuToggler.classList.add('active')
      this.iconClosed.style.display = 'none'
      this.iconOpened.style.display = 'block'
    } else {
      this.menuNav.classList.remove('menu-nav--opened')
      this.menuToggler.classList.remove('active')
      this.iconClosed.style.display = 'block'
      this.iconOpened.style.display = 'none'
    }
  }
}

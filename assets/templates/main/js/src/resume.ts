import scrollToElement from 'scroll-to-element'

import { superbutton } from './superbutton'

export const initResume = () => {
  const buttonWrite = document.getElementById('resume-header__write')
  if (!buttonWrite) {
    return
  }

  buttonWrite.addEventListener('click', (event) => {
    const targetSelector = buttonWrite.getAttribute('data-target')
    const target = document.querySelector(targetSelector)
    if (target) {
      scrollToElement(targetSelector)
      event.preventDefault()
    }
  })

  buttonWrite.addEventListener('mousemove', superbutton)
}

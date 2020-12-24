import scrollToElement from 'scroll-to-element'

export const initResume = () => {
  const buttonWrite = document.getElementById('resume-header__write')
  if (buttonWrite === null) {
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

  buttonWrite.addEventListener('mousemove', (event) => {
    const x = event.pageX - event.target.offsetLeft
    const y = event.pageY - event.target.offsetTop

    event.target.style.setProperty('--x', `${x}px`)
    event.target.style.setProperty('--y', `${y - 60}px`)
  })
}

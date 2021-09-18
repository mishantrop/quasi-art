export const superbutton = (event: MouseEvent) => {
  // @ts-ignore
  const x = event.pageX - event.target.offsetLeft
  // @ts-ignore
  const y = event.pageY - event.target.offsetTop

  // @ts-ignore
  event.target.style.setProperty('--x', `${x}px`)
  // @ts-ignore
  event.target.style.setProperty('--y', `${y - 60}px`)
}

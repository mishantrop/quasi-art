/* eslint-disable semi */
export const superbutton = (event: MouseEvent) => {
  const x = event.pageX - (event.target as HTMLElement).offsetLeft;
  const y = event.pageY - (event.target as HTMLElement).offsetTop;

  (event.target as HTMLElement).style.setProperty('--x', `${x}px`);
  (event.target as HTMLElement).style.setProperty('--y', `${y - 60}px`);
}

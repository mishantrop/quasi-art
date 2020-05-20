/**
 * Получить ширину экрана с учётом iOS
 */
const getWindowWidth = () => {
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  return (iOS) ? screen.width : window.innerWidth
};

const isElements = (items) => {
  return NodeList.prototype.isPrototypeOf(items);
};

const isObject = (variable) => {
  return typeof variable === 'object' && variable !== null;
};

const isMobile = () => {
  return (window.innerWidth < 576);
};

const isTablet = () => {
  return (window.innerWidth < 993);
};

const isWide = () => {
  return (window.innerWidth >= 1500);
};

export {
  getWindowWidth,
  isElements,
  isMobile,
  isObject,
  isTablet,
  isWide,
};

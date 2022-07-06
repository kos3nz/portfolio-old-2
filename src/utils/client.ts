export const getScrollTop = () => {
  return Math.max(window.scrollY, document.documentElement.scrollTop);
};

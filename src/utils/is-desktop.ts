export function isDesktop() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

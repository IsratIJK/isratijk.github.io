const RELEASE_DELAY_MS = 450;
const ATTR = "data-touched";

export const initTouchPress = () => {
  let pressed: Element[] = [];
  let timer: number | undefined;

  const clear = () => {
    pressed.forEach((el) => el.removeAttribute(ATTR));
    pressed = [];
  };

  document.addEventListener(
    "touchstart",
    (e) => {
      window.clearTimeout(timer);
      clear();
      let el = e.target instanceof Element ? e.target : null;
      while (el && el !== document.body) {
        el.setAttribute(ATTR, "true");
        pressed.push(el);
        el = el.parentElement;
      }
    },
    { passive: true },
  );

  const release = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(clear, RELEASE_DELAY_MS);
  };
  document.addEventListener("touchend", release, { passive: true });
  document.addEventListener("touchcancel", release, { passive: true });
};

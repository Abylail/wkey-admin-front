
export default function ({app}, inject) {
  inject("isMobile", window.innerWidth < 800);
}

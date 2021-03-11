import debounce from "lodash/debounce";

export default class DomUtils {
  static useableWindow() {
    return typeof window !== "undefined";
  }

  static size() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    return { innerHeight, innerWidth, aspect: innerWidth / innerHeight };
  }
}

export default class WindowResizeHelper {
  public static windowSize: number;

  constructor() {
    WindowResizeHelper.windowSize = window.innerWidth;

    window.addEventListener('resize', () => {
      WindowResizeHelper.windowSize = window.innerWidth;
    });
  }
}

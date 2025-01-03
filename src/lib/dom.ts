export function findElement(
  el: ParentNode,
  selector: string,
  options: { timeout?: number; retry?: number } = {},
): Promise<HTMLElement> {
  const { timeout = 1000, retry = 10 } = options;

  return new Promise((resolve, reject) => {
    let attempts = 0;

    const find = () => {
      const found = el.querySelector(selector);
      if (found != null) {
        resolve(found as HTMLElement);
      } else {
        attempts += 1;
        if (attempts >= retry) {
          reject(new Error(`Can not find element with selector: ${selector}`));
        } else {
          setTimeout(find, timeout);
        }
      }
    };

    find();
  });
}

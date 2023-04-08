export const flatten = (subSet: Record<string, any>): string[] =>
  Object.values(subSet as Record<string, string>).flatMap((path) =>
    typeof path === "string" ? path : flatten(path)
  );

export const shape = (obj: Object) => JSON.stringify(obj, null, 0);

export const getAll = (container: Element, selector: string) =>
  Array.from(container.querySelectorAll(selector));

interface ClassList {
  [k: string]: boolean;
}

export const classList = (list: ClassList): string =>
  Object.keys(list)
    .filter(className => list[className] === true)
    .join(" ");

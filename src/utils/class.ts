interface ObjectForm {
  [k: string]: boolean;
}

type ClassList = (string | ObjectForm)[] | ObjectForm;

/**
 * Filters the keys whose value equals to 'true' and returns a string that
 * contains them.
 *
 * @param obj An object.
 *
 * @returns A string with the filtered keys.
 */
const filterkeys = (obj: ObjectForm): string =>
  Object.keys(obj)
    .filter(x => obj[x])
    .join(" ");

/**
 * Turns a list of classes into a string. If an object is passed, the string
 * include the keys whose values equals to 'true'.
 *
 * @param list An array or an object containing an element's class list.
 *
 * @returns A string containing the valid classes.
 */
export const classList = (list: ClassList): string => {
  if (typeof list !== "object") {
    throw Error("'list' must be an array or an object.");
  }

  return Array.isArray(list)
    ? list.map(x => (typeof x === "object" ? filterkeys(x) : x)).join(" ")
    : filterkeys(list);
};

export const mergeWithoutDupicates = <T>(arr1: T[], arr2: T[]): T[] => {
  const mergedArray: T[] = [...arr1, ...arr2];

  return mergedArray.filter(
    (value: T, index: number): boolean => mergedArray.indexOf(value) === index
  );
};

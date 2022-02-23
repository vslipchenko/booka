export const getEnumValues = (enumerable: {[key: string]: string | number}): Array<string | number> => {
  const values = Object.values(enumerable);

  return values.slice(values.length / 2); // For key retrieval use values.slice(0, values.length / 2));
};

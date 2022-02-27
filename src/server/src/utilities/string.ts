export const imprint = (value: string, translations: {[key: string]: string}): string => {
  let imprinted = value;

  Object.keys(translations).forEach(
    (key: string) => (imprinted = imprinted.replace(`{{${key}}}`, translations[key])),
  );

  return imprinted;
};

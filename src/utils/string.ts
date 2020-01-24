export const isValidEmail = (email: string): boolean => {
  return !!email.match(/\w+(\.\w+)*@\w+\.\w+/g);
};

export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const projectTitleToPath = (title: string): string => {
  const formattedTitle = title.toLowerCase().replace(/ /g, "-");
  return `/projects/${formattedTitle}`;
};

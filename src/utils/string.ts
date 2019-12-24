export const isValidEmail = (email: string): boolean =>
  !!email.match(/\w+(\.\w+)*@\w+\.\w+/g);

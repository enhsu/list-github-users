export const getErrorMessage: (err: unknown) => string = (err: unknown) => {
  let message: string;

  if (err instanceof Error) {
    message = err.message;
  } else {
    message = String(err);
  }

  return message;
};

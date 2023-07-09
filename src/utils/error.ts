export const getErrorPath = (message: string | string[]) => {
  let msg = message;
  if (Array.isArray(message)) {
    msg = message.join(",");
  }
  return `/error?message=${encodeURIComponent(msg as string)}`;
};

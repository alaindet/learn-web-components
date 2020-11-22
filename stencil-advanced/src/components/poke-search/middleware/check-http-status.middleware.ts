export const checkHttpStatus = (response: Response): Response => {
  if (response.status >= 400 && response.status < 600) {
    throw new Error(`ERROR: ${response.status} HTTP error`);
  }
  return response;
};

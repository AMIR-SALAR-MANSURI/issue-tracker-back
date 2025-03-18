export function formatResponse<T>(
  data: T,
  success = true,
  message: string = 'Request successful',
  extra?: Record<string, any>, // Allows additional properties dynamically
) {
  return {
    success,
    message,
    data,
    ...extra, 
  };
}

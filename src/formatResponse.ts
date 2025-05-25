// src/common/utils/response.util.ts
export const customResponse = (
  data: any,
  message = 'Success',
  status = true,
  extra: Record<string, any> = {},
) => {
  return {
    status,
    message,
    data,
    ...extra, // This lets you include page, limit, totalPages, etc. outside data
  };
};

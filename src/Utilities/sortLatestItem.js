export const sortLatestItem = (values) => {
  return values?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

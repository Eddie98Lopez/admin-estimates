export const getDateIn30Days = (): Date => {
  const today = new Date();
  const result = new Date(today);
  result.setDate(today.getDate() + 30);
  return result;
};

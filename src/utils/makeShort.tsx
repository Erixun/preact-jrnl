
export const makeShort = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    month: 'numeric',
    day: 'numeric',
  });
};

export async function generateDateStringsFromDaysAgo(daysAgo: number) {
  const date = new Date();
  let day = 0;
  const dateStrings = [];
  while (day <= daysAgo) {
    const dateString = date.toLocaleDateString('sv-SE');
    dateStrings.push(dateString);
    date.setDate(date.getDate() - 1);
    day += 1;
  }

  return dateStrings;
}

import db from '../services/idbDriver';

export async function calcCurrentStreak(dates: string[]) {
  let streak = 0;
  console.log(dates);

  const dbKeys = await db.keys();
  for (const [i, date] of dates.entries()) {
    if (dbKeys.includes(date)) {
      streak += 1;
    } else if (i !== 0) {
      break;
    }
  }

  return streak;
}

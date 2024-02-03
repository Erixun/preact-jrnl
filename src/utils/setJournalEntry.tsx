import db from '../services/idbDriver';

export function setJournalEntry(text: string) {
  const date = new Date();
  const key = date.toLocaleDateString('sv-SE');
  const value = {
    text,
    preview: text.slice(0, 100),
    createdAt: date,
    updatedAt: date,
  };
  db.set(key, value).then(() => {
    console.log('Added journal entry');
  });
}

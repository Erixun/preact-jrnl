import { useState } from 'preact/hooks';
import { JournalEntryList } from '../journal/JournalEntryList';
import { JournalEntrySpace } from '../journal/JournalEntrySpace';

export function AppMain({ showEntries }: { showEntries: boolean }) {
  const [ChosenJournalEntryDate, setChosenJournalEntryDate] = useState('');

  return (
    <main style={{ display: 'flex' }}>
      {showEntries && (
        <JournalEntryList
          chosenDate={ChosenJournalEntryDate}
          setChosenDate={setChosenJournalEntryDate}
        />
      )}
      <JournalEntrySpace
        ChosenJournalEntryDate={ChosenJournalEntryDate}
        setChosenJournalEntryDate={setChosenJournalEntryDate}
      />
    </main>
  );
}

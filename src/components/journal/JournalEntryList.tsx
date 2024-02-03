import { calcCurrentStreak } from '@/utils/calcCurrentStreak';
import { generateDateStringsFromDaysAgo } from '@/utils/generateDateStringsFromDaysAgo';
import { useState, useEffect } from 'preact/hooks';
import { JournalEntryDate } from './JournalEntryDate';
import { useWindowSizeValue } from '../../hooks/useWindowSizeValue';
import db from '@/services/idbDriver';
import { Box, Text } from '@chakra-ui/react';

export const JournalEntryList = ({
  chosenDate,
  setChosenDate,
}: {
  chosenDate: string;
  setChosenDate: (date: string) => void;
}) => {
  const handleSetChosenJournalEntryDate = (date: string) => {
    console.log('setChosenDate', date);
    if (chosenDate === date) return setChosenDate('');
    setChosenDate(date);
  };

  const [entryDates, setEntryDates] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toLocaleDateString('sv-SE');
    db.get(today).then((value) => {
      if (!value) return;
      setChosenDate(today);
    });
    generateDateStringsFromDaysAgo(50).then(setEntryDates).catch(console.error);
  }, []);

  useEffect(() => {
    calcCurrentStreak(entryDates).then(setStreak).catch(console.error);
  }, [entryDates]);

  const streakSuffix = useWindowSizeValue('days', `day streak`);

  return (
    <Box as="aside">
      <Text as="h2" fontSize={'sm'} fontWeight={'normal'}>
        <strong>{streak}</strong> {streakSuffix}
        {streak > 0 && '!'}
      </Text>
      <div className="journal-entries">
        {entryDates.map((date) => {
          return (
            <JournalEntryDate
              date={date}
              chosenDate={chosenDate}
              onClick={handleSetChosenJournalEntryDate}
            />
          );
        })}
      </div>
    </Box>
  );
};

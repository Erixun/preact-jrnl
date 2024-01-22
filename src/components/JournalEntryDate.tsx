import { useEffect, useState } from 'preact/hooks';
import db from '../services/idbDriver';
import { Button } from '@chakra-ui/react';

export const JournalEntryDate = ({
  date,
  chosenDate,
  onClick,
}: {
  date: string;
  chosenDate: string;
  onClick: (date: string) => void;
}) => {
  const [journalEntry, setJournalEntry] = useState(null);

  useEffect(() => {
    db.get(date).then((value) => {
      if (value) console.log('value', value);
      setJournalEntry(value);
    });
  }, [date]);

  const isChosenDate = chosenDate === date;
  const isToday = date === new Date().toLocaleDateString('sv-SE');

  return (
    <div className='entry-date'>
      <Button
      style={{
        border: '1px solid transparent',
        borderColor: journalEntry ? 'green' : 'transparent',
        borderRight: 'none',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: '-2px',
      }}
      size={'lg'}
        variant={!journalEntry ? 'ghost' : isChosenDate? 'solid' : 'outline'}
        colorScheme={journalEntry ? 'green' : 'gray'}
        isDisabled={!journalEntry}
        onClick={() => onClick(date)}
      >
        <h3 style={{ textDecoration: !journalEntry && !isToday ? 'line-through' : 'none' }}>
          {date}
        </h3>
      </Button>
    </div>
  );

  {
    /* <h2>{props.date}</h2>
      {journalEntry ? (
        <JournalEntry
          title={journalEntry.title}
          text={journalEntry.text}
          createdAt={journalEntry.createdAt}
          updatedAt={journalEntry.updatedAt}
        />
      ) : (
        <p>Empty</p>
      )} */
  }
  {
    /* ); */
  }
};

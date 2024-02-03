import { useEffect, useState } from 'preact/hooks';
import db from '../../services/idbDriver';
import { Button } from '@chakra-ui/react';
import { WIDTH_MOBILE } from '../../constants/size';
import { useWindowSize } from '@/hooks/useWindowSize';
import { makeShort } from '@/utils/makeShort';
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

  const size = useWindowSize();
  const style =
    size && size.width >= WIDTH_MOBILE
      ? {
          border: '1px solid transparent',
          borderColor: journalEntry
            ? 'green'
            : isToday && !chosenDate
            ? 'gray'
            : 'transparent',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          marginRight: '-2px',
        }
      : {
          border: '1px solid transparent',
          borderColor: journalEntry
            ? 'green'
            : isToday && !chosenDate
            ? 'gray'
            : 'transparent',
        };

  return (
    <div className="entry-date">
      <Button
        style={style}
        size={'lg'}
        variant={!journalEntry ? 'ghost' : isChosenDate ? 'solid' : 'outline'}
        colorScheme={journalEntry ? 'green' : 'gray'}
        isDisabled={!journalEntry}
        onClick={() => onClick(date)}
      >
        <h3
          style={{
            textDecoration: !journalEntry && !isToday ? 'line-through' : 'none',
          }}
        >
          {size && size.width < WIDTH_MOBILE ? makeShort(date) : date}
        </h3>
      </Button>
    </div>
  );
};

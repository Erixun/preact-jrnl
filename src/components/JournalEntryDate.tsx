import { useEffect, useState } from 'preact/hooks';
import db from '../services/idbDriver';
import { Button } from '@chakra-ui/react';
import { WIDTH_MOBILE } from '../constants/size';

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
          // borderRight: 'unset',
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
          // borderRadius: "50%",
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

export const makeShort = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    month: 'numeric',
    day: 'numeric',
  });
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export const useWindowSizeValue = (forMobile: any, forDesktop: any) => {
  const size = useWindowSize();
  return size && size.width < WIDTH_MOBILE ? forMobile : forDesktop;
};

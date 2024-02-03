import { render } from 'preact';
import preactLogo from './assets/preact.svg';
import './style.css';
import db from './services/idbDriver';
import {
  Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  Flex,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  JournalEntryDate,
  useWindowSizeValue,
} from './components/JournalEntryDate';
import { JournalEntryForm } from './components/JournalEntryForm';
import { useEffect, useState } from 'preact/hooks';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import theme from './theme/theme';

export function App() {
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB.");
    return <p>"This browser doesn't support IndexedDB."</p>;
  }

  const [ChosenJournalEntryDate, setChosenJournalEntryDate] = useState('');

  const handleSetChosenJournalEntryDate = (date: string) => {
    console.log('setChosenJournalEntryDate', date);
    if (ChosenJournalEntryDate === date) return setChosenJournalEntryDate('');
    setChosenJournalEntryDate(date);
  };

  const [entryDates, setEntryDates] = useState([]); // ['2021-08-01', '2021-08-02'
  const [streak, setStreak] = useState(0);

  const [showEntries, setShowEntries] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString('sv-SE');
    db.get(today).then((value) => {
      if (!value) return;
      setChosenJournalEntryDate(today);
    });
    generateDateStringsFromDaysAgo(50).then(setEntryDates).catch(console.error);
  }, []);

  useEffect(() => {
    calcCurrentStreak(entryDates).then(setStreak).catch(console.error);
  }, [entryDates]);

  const streakSuffix = useWindowSizeValue('days', `day streak`);
  return (
    <ChakraProvider theme={theme}>
      <div className={'app-container'}>
        <Flex
          as="header"
          paddingInlineStart={3}
          paddingInlineEnd={useWindowSizeValue(1, 0)}
          gap={2}
        >
          <Heading as="h1" size="xl" fontStyle={'italic'} textAlign={'left'}>
            jrnl.me
          </Heading>
          <ButtonGroup>
            <ButtonToggleColorMode />
            {/* TODO: ButtonShowEntries */}
            <Button
              variant="ghost"
              aspectRatio={1}
              marginBottom={-2}
              marginInline={1}
              onClick={() => setShowEntries(!showEntries)}
            >
              <HamburgerIcon boxSize={6} />
            </Button>
          </ButtonGroup>
          {/* </header> */}
        </Flex>
        <main style={{ display: 'flex' }}>
          {showEntries && (
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
                      chosenDate={ChosenJournalEntryDate}
                      onClick={handleSetChosenJournalEntryDate}
                    />
                  );
                })}
              </div>
            </Box>
          )}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              // justifyContent: 'center',
              // // alignContent: 'center',
              gap: 50,
              paddingInline: useWindowSizeValue(5, 20),
              paddingBlockStart: 16,
            }}
          >
            <Flex
              as="form"
              onSubmit={(e) => e.preventDefault()}
              direction={'column'}
              gap={3}
              flexGrow={1}
              justifyContent={'center'}
            >
              <JournalEntryForm
                chosenEntryDate={ChosenJournalEntryDate}
                setChosenEntryDate={setChosenJournalEntryDate}
              />
            </Flex>

            <footer>
              <Button
                colorScheme={'red'}
                size={'sm'}
                onClick={() => {
                  db.clear();
                }}
                variant={'solid'}
              >
                Delete all entries!
              </Button>
              <p
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                Made with{' '}
                <img
                  src={preactLogo}
                  alt="Preact Logo"
                  width="16"
                  style={{ margin: 4 }}
                />{' '}
                by
                <a href="" target="_blank" style={{ marginInlineStart: 4 }}>
                  @erixund
                </a>
              </p>
            </footer>
          </div>
        </main>
      </div>
    </ChakraProvider>
  );
}

export function ButtonToggleColorMode() {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MoonIcon, SunIcon);
  const colorScheme = useColorModeValue('blackAlpha', 'gray');
  return (
    <Button
      variant="ghost"
      colorScheme={colorScheme}
      marginBottom={-3}
      aspectRatio={1}
      onClick={toggleColorMode}
    >
      <Icon boxSize={5} />
    </Button>
  );
}

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

  // const dayBefore = new Date();
  // dayBefore.setDate(dayBefore.getDate() - 1);
  // console.log(dbKeys);
  // while (streak < 5 && !(dayBefore.toLocaleDateString('sv-SE') in dbKeys)) {
  //   streak += 1;
  //   dayBefore.setDate(dayBefore.getDate() - 1);
  // }

  return streak;
}

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

render(<App />, document.getElementById('app'));

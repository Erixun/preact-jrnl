import { Flex } from '@chakra-ui/react';
import { useWindowSizeValue } from '../../hooks/useWindowSizeValue';
import { JournalEntryForm } from './JournalEntryForm';
import { AppFooter } from '../app/AppFooter';

export function JournalEntrySpace({
  ChosenJournalEntryDate,
  setChosenJournalEntryDate,
}: {
  ChosenJournalEntryDate: string;
  setChosenJournalEntryDate: (date: string) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
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
          chosenDate={ChosenJournalEntryDate}
          setChosenDate={setChosenJournalEntryDate}
        />
      </Flex>
      <AppFooter />
    </div>
  );
}

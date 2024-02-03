import { Flex, Text, Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import db from '../../services/idbDriver';
import { useAutosizeTextArea } from '../../hooks/useAutosizeTextArea';
import { setJournalEntry } from '../../utils/setJournalEntry';

export const JournalEntryForm = ({
  chosenDate,
  setChosenDate,
}: {
  chosenDate: string;
  setChosenDate: (date: string) => void;
}) => {
  const [text, setText] = useState('');

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const addJournalEntry = () => {
    setJournalEntry(text);
    const today = new Date().toLocaleDateString('sv-SE');
    setChosenDate(today);
    setText('');
  };

  useEffect(() => {
    if (!chosenDate) return;
    db.get(chosenDate).then((value) => {
      if (!value) return;
      setText(value.text);
    });

    return () => {
      setText('');
    };
  }, [chosenDate]);

  const textareaRef = useAutosizeTextArea(text);

  const date = chosenDate ? new Date(chosenDate) : new Date();
  return (
    <Flex as="fieldset" direction={'column'} gap={1} disabled={chosenDate}>
      <Text
        paddingInline={15}
        paddingBlockEnd={3}
        as="legend"
        fontSize="sm"
        color={'gray.500'}
        textAlign="center"
      >
        {date.toLocaleDateString('en-UK', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        })}
      </Text>
      <Textarea
        ref={textareaRef}
        autoFocus={true}
        className={`input-text${chosenDate ? ' submitted' : ''}`}
        placeholder={'Your journal entry here'}
        name=""
        id=""
        _disabled={{ opacity: 1 }}
        cols={60}
        minHeight={200}
        resize={'none'}
        overflow={'hidden'}
        value={text}
        colorScheme={'red'}
        onChange={handleChangeText}
      />
      <Flex direction={'column'} height={50}>
        {!chosenDate && (
          <button
            disabled={text.length < 10}
            style={{ opacity: text.length < 10 ? 0.5 : 1 }}
            className="btn btn-primary"
            onClick={addJournalEntry}
          >
            Submit
          </button>
        )}
      </Flex>
    </Flex>
  );
};

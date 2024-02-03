import { Flex, Text, Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'preact/compat';
import { useEffect, useRef, useState } from 'preact/hooks';
import db from '../services/idbDriver';

export const JournalEntryForm = ({
  chosenEntryDate,
  setChosenEntryDate
}: {
  chosenEntryDate: string;
  setChosenEntryDate: (date: string) => void;
}) => {
  const [title, setTitle] = useState(
    `Journal entry - ${
      chosenEntryDate ||
      new Date().toLocaleDateString('en-UK', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    }`
  );
  const [text, setText] = useState('');

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const addJournalEntry = () => {
    setJournalEntry(text);
    const today = new Date().toLocaleDateString('sv-SE');
    setChosenEntryDate(today);
    setText('');
  };

  useEffect(() => {
    if (!chosenEntryDate) return;
    db.get(chosenEntryDate).then((value) => {
      if (!value) return;
      setText(value.text);
    });

    return () => {
      setText('');
    };
  }, [chosenEntryDate]);

  const textareaRef = useAutosizeTextArea(text); //useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   const scrollHeight = textareaRef.current?.scrollHeight;
  //   const height = textareaRef.current?.clientHeight;
  //   if (textareaRef && textareaRef.current) {
  //     textareaRef.current.style.height = textareaRef.current.scrollHeight + 10 + 'px';
  //   }
  // }, [textareaRef.current?.scrollHeight]);

  //TODO: if today has an entry, show it

  //TODO: enable editing of existing entries

  const date = chosenEntryDate ? new Date(chosenEntryDate) : new Date();
  return (
    <Flex as="fieldset" direction={'column'} gap={1} disabled={chosenEntryDate}>
      <Text
        paddingInline={15}
        paddingBlockEnd={3}
        as="legend"
        fontSize="sm"
        // color="gray.700"
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
        className={`input-text${chosenEntryDate ? ' submitted' : ''}`}
        placeholder={'Your journal entry here'}
        name=""
        id=""
        _disabled={{ opacity: 1 }}
        cols={60}
        // rows={10}
        minHeight={200}
        resize={'none'}
        overflow={'hidden'}
        value={text}
        colorScheme={'red'}
        onChange={handleChangeText}
      />
      <Flex direction={'column'} height={50}>
        {!chosenEntryDate && (
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

function useAutosizeTextArea(value: string) {
  const ref = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight + 10}px`;
  }, [value]);

  return ref;
}

function setJournalEntry(text: string) {
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

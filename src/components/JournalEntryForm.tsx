import { Button, Flex, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import db from '../services/idbDriver';

export const JournalEntryForm = ({
  chosenEntryDate,
}: {
  chosenEntryDate: string;
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

  //TODO: if today has an entry, show it

  //TODO: enable editing of existing entries

  const date = chosenEntryDate ? new Date(chosenEntryDate) : new Date();
  return (
    <Flex
      as="fieldset"
      direction={'column'}
      gap={1}
      flexGrow={1}
      disabled={chosenEntryDate}
    >
      <Text
        paddingInline={15}
        paddingBlockEnd={3}
        as="legend"
        fontSize="sm"
        color="gray.700"
        textAlign="center"
      >
        {date.toLocaleDateString('en-UK', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        })}
      </Text>
      <textarea
        autoFocus={true}
        className={`input-text${chosenEntryDate ? ' submitted' : ''}`}
        placeholder={'Your journal entry here'}
        name=""
        id=""
        cols={60}
        rows={10}
        value={text}
        onChange={handleChangeText}
      ></textarea>
      {!chosenEntryDate && (
        <button className="btn btn-primary" onClick={addJournalEntry}>
          Submit
        </button>
      )}
    </Flex>
  );
};

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

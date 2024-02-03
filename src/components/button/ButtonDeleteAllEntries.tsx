import db from '@/services/idbDriver';
import { Button } from '@chakra-ui/react';

export function ButtonDeleteAllEntries() {
  return (
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
  );
}

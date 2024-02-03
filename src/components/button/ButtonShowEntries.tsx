import { Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export function ButtonShowEntries({ showEntries, setShowEntries }) {
  return (
    <Button
      variant="ghost"
      aspectRatio={1}
      marginBottom={-2}
      marginInline={1}
      onClick={() => setShowEntries(!showEntries)}
    >
      <HamburgerIcon boxSize={6} />
    </Button>
  );
}

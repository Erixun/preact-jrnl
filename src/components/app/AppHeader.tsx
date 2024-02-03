import { ButtonGroup, Flex, Heading } from '@chakra-ui/react';
import { useWindowSizeValue } from '../../hooks/useWindowSizeValue';
import { ButtonToggleColorMode } from '../button/ButtonToggleColorMode';
import { ButtonShowEntries } from '../button/ButtonShowEntries';

export const AppHeader = ({
  showEntries,
  setShowEntries,
}: {
  showEntries: boolean;
  setShowEntries: (showEntries: boolean) => void;
}) => {
  return (
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
        <ButtonShowEntries
          showEntries={showEntries}
          setShowEntries={setShowEntries}
        />
      </ButtonGroup>
    </Flex>
  );
};

import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

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

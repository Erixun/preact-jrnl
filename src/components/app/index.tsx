import { ChakraProvider, theme } from '@chakra-ui/react';
import { useState } from 'preact/hooks';
import { AppContainer } from './AppContainer';
import { AppHeader } from './AppHeader';
import { AppMain } from './AppMain';

export default function App() {
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB.");
    return <p>"This browser doesn't support IndexedDB."</p>;
  }

  const [showEntries, setShowEntries] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <AppContainer>
        <AppHeader showEntries={showEntries} setShowEntries={setShowEntries} />
        <AppMain showEntries={showEntries} />
      </AppContainer>
    </ChakraProvider>
  );
}

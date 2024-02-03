import { Grid } from '@chakra-ui/react';
import { ReactNode } from 'preact/compat';

export function AppContainer({ children }: { children: ReactNode }) {
  return (
    <Grid height={'inherit'} templateRows={'auto 1fr auto'} overflow={'hidden'}>
      {children}
    </Grid>
  );
}

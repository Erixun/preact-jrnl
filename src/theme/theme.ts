// theme.js

// 1. import `extendTheme` function
import { ThemeConfig, extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
      color: props.colorMode === 'dark' ? 'white' : 'gray.900',
    },
  }),
}
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const extentions = {
  // styles,
  config
}

// 3. extend the theme
const theme = extendTheme(extentions);

export default theme;

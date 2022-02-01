import React from 'react';
import {Text, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import Calculator from './src/screens/Calculator';
import theme from './src/theme';

const App = () => {
  return (
    // colocar status bar
    <ThemeProvider theme={theme}>
      <Calculator />
    </ThemeProvider>
  );
};

export default App;

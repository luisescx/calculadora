import React from 'react';
import {Text, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import theme from './src/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: theme.FONTS.TEXT,
          }}>
          App Calculadora
        </Text>
      </View>
    </ThemeProvider>
  );
};

export default App;

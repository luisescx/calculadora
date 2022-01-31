import React from 'react';
import {Text} from 'react-native';
import theme from '../../theme';

import {Container} from './styles';

const Display = () => {
  return (
    <Container style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: theme.COLORS.TEXT}}>Mostrar Calculos</Text>
    </Container>
  );
};

export default Display;

import React from 'react';
import {Text} from 'react-native';
import theme from '../../theme';

import {Container} from './styles';

interface Props {
  calculation: string;
  result: number;
}

const Display: React.FC<Props> = ({calculation, result}) => {
  return (
    <Container style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: theme.COLORS.TEXT}}>{calculation}</Text>
      <Text style={{color: theme.COLORS.TEXT}}>{result}</Text>
    </Container>
  );
};

export default Display;

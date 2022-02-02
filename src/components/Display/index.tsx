import React from 'react';
import {Text} from 'react-native';
import theme from '../../theme';

import {Container, TextNumber} from './styles';

interface Props {
  calculation: string;
  result: number;
}

const Display: React.FC<Props> = ({calculation, result}) => {
  return (
    <Container>
      <TextNumber>{calculation}</TextNumber>
      <TextNumber>{result}</TextNumber>
    </Container>
  );
};

export default Display;

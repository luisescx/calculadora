import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import theme from '../../theme';

import {Container, Title} from './styles';

interface Props extends TouchableOpacityProps {
  label?: string;
  type: 'numberButton' | 'calcButton' | 'topButton';
  doubleWidth?: boolean;
  isBorderRight?: boolean;
}

const Button: React.FC<Props> = ({
  label,
  type,
  doubleWidth,
  isBorderRight = true,
  ...rest
}) => {
  return (
    <Container
      doubleWidth={doubleWidth}
      isBorderRight={isBorderRight}
      activeOpacity={0.7}
      type={type}
      onPress={() => {}}
      {...rest}>
      <Title>{label}</Title>
    </Container>
  );
};

export default Button;

import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import theme from '../../theme';

import {Container, Title} from './styles';

interface Props extends TouchableOpacityProps {
  type: 'numberButton' | 'calcButton' | 'topButton';
  buttonPressed: (buttonValue: string) => void;
  label: string;
  doubleWidth?: boolean;
  isBorderRight?: boolean;
}

const Button: React.FC<Props> = ({
  type,
  buttonPressed,
  label,
  doubleWidth,
  isBorderRight = true,
  ...rest
}) => {
  const handleButton = () => {
    buttonPressed(label);
  };

  return (
    <Container
      doubleWidth={doubleWidth}
      isBorderRight={isBorderRight}
      activeOpacity={0.7}
      type={type}
      onPress={handleButton}
      {...rest}>
      <Title>{label}</Title>
    </Container>
  );
};

export default Button;

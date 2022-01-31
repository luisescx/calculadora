import {TouchableOpacity} from 'react-native';
import styled, {css} from 'styled-components/native';

interface Props {
  doubleWidth?: boolean;
  isBorderRight?: boolean;
  type: 'numberButton' | 'calcButton' | 'topButton';
}

export const Container = styled(TouchableOpacity)<Props>`
  width: ${({doubleWidth}) => (doubleWidth ? 50 : 25)}%;
  justify-content: center;
  align-items: center;

  ${({theme, isBorderRight}) =>
    isBorderRight &&
    css`
      border-right-width: 1px;
      border-right-color: ${theme.COLORS.BACKGROUND};
    `}

  ${({theme, type}) =>
    type === 'topButton' &&
    css`
      background-color: ${theme.COLORS.TOP_BUTTONS};
    `};

  ${({theme, type}) =>
    type === 'calcButton' &&
    css`
      background-color: ${theme.COLORS.CALC_BUTTON};
    `};

  ${({theme, type}) =>
    type === 'numberButton' &&
    css`
      background-color: ${theme.COLORS.NUMBERS_BUTTON};
    `};
`;

export const Title = styled.Text`
  font-size: 32px;

  ${({theme}) => css`
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.TEXT};
  `}
`;

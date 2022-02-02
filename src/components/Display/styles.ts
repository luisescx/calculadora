import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
  height: 40%;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 8px;
`;

export const TextNumber = styled.Text`
  font-size: 48px;

  ${({theme}) => css`
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.TEXT};
  `}
`;

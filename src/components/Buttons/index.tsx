import React from 'react';
import Button from '../Button';
import ButtonRow from '../ButtonRow';
import LineSeparator from '../LineSeparator';
import {Container} from './styles';

interface Props {
  handleButtonPressed: (buttonPressed: string) => void;
}

const Buttons: React.FC<Props> = ({handleButtonPressed}) => {
  return (
    <Container>
      <ButtonRow>
        <Button
          buttonPressed={handleButtonPressed}
          doubleWidth={true}
          label="AC"
          type="topButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="%"
          type="topButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="/"
          type="calcButton"
          isBorderRight={false}
        />
      </ButtonRow>

      <LineSeparator />

      <ButtonRow>
        <Button
          buttonPressed={handleButtonPressed}
          label="7"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="8"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="9"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="x"
          type="calcButton"
          isBorderRight={false}
        />
      </ButtonRow>

      <LineSeparator />

      <ButtonRow>
        <Button
          buttonPressed={handleButtonPressed}
          label="4"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="5"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="6"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="-"
          type="calcButton"
          isBorderRight={false}
        />
      </ButtonRow>

      <LineSeparator />

      <ButtonRow>
        <Button
          buttonPressed={handleButtonPressed}
          label="1"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="2"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="3"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="+"
          type="calcButton"
          isBorderRight={false}
        />
      </ButtonRow>

      <LineSeparator />

      <ButtonRow>
        <Button
          doubleWidth={true}
          buttonPressed={handleButtonPressed}
          label="0"
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="."
          type="numberButton"
        />
        <Button
          buttonPressed={handleButtonPressed}
          label="="
          type="calcButton"
          isBorderRight={false}
        />
      </ButtonRow>
    </Container>
  );
};

export default Buttons;

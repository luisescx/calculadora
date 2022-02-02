import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import Buttons from '../../components/Buttons';
import Display from '../../components/Display';

import {Container} from './styles';

const Calculator = () => {
  const [calculation, setCalculation] = useState('');
  const [operation, setOperation] = useState<string | null>(null);
  const [numbers, setNumbers] = useState([0, 0]);
  const [result, setResult] = useState<number>(0);
  const [dot, setDot] = useState('');
  const [percentage, setPercentage] = useState('');
  const [secondNumberFirstEdit, setSecondNumberFirstEdit] = useState(false);
  const [firstNumberFirstEdit, setFirstNumberFirstEdit] = useState(false);

  const calculate = useCallback(
    (value?: number) => {
      if (operation === '+') {
        return value ? numbers[0] + value : numbers[0] + numbers[1];
      }
      if (operation === '-') {
        return value ? numbers[0] - value : numbers[0] - numbers[1];
      }
      if (operation === 'x') {
        return value ? numbers[0] * value : numbers[0] * numbers[1];
      }
      if (operation === '/') {
        return value ? numbers[0] / value : numbers[0] / numbers[1];
      }
    },
    [operation, numbers],
  );

  const handlePercentage = useCallback(
    (value: string) => {
      if (
        percentage !== '' ||
        calculation === '' ||
        (!operation && !numbers[0]) ||
        (operation && !numbers[1]) ||
        handleCalculationSlice('.', true)
      ) {
        return;
      }

      if (!operation) {
        const percentageResult = (numbers[0] / 100) * 1;

        setNumbers(prevState => {
          prevState[0] = percentageResult;
          return [...prevState];
        });

        setResult(percentageResult);
      }

      if (operation) {
        const percentageResult = (numbers[1] / 100) * numbers[0];
        const newValue = calculate(percentageResult);

        setNumbers([newValue!, 0]);
        setCalculation(`${newValue}`);
        setResult(0);
        setOperation(null);
        setDot('');
        setPercentage('');
        return;
      }

      setPercentage('%');
      setCalculation(prevState => `${prevState}${value}`);
    },
    [percentage, calculation, operation, numbers, calculate],
  );

  const handleDotButton = useCallback(
    (value: string) => {
      if (dot !== '' || handleCalculationSlice('%', true)) {
        return;
      }

      if (
        (!numbers[0] && !operation && !firstNumberFirstEdit) ||
        (!numbers[1] && operation && !secondNumberFirstEdit)
      ) {
        setDot('.');
        setCalculation(prevState => `${prevState}0.`);
        return;
      }

      setDot('.');
      setCalculation(prevState => `${prevState}${value}`);
    },
    [dot, calculation, numbers, operation],
  );

  const handleCleanButton = useCallback(() => {
    setOperation(null);
    setCalculation('');
    setResult(0);
    setNumbers([0, 0]);
    setDot('');
    setPercentage('');
    setSecondNumberFirstEdit(false);
    setFirstNumberFirstEdit(false);
  }, []);

  const handleEqualButton = useCallback(() => {
    let resultValues: number;

    if (
      !numbers[1] &&
      (handleCalculationSlice('x') ||
        handleCalculationSlice('/') ||
        handleCalculationSlice('-') ||
        handleCalculationSlice('/'))
    ) {
      resultValues = numbers[0];
    } else {
      resultValues = calculate()!;
    }

    setOperation(null);
    setCalculation(`${resultValues}`);
    setResult(0);
    setNumbers([resultValues!, 0]);
    setDot('');
    setPercentage('');
    setSecondNumberFirstEdit(false);
    setFirstNumberFirstEdit(false);
  }, [numbers, calculation, calculate]);

  const handleCalculationSlice = useCallback(
    (value: string, equals = false) => {
      if (equals) {
        return calculation.slice(-1) === value;
      }

      return calculation.slice(-1) !== value;
    },
    [calculation],
  );

  const handleZerosPressed = useCallback(
    (value: string) => {
      if (value === '0' && firstNumberFirstEdit && !numbers[0]) {
        return false;
      }

      if (value === '0' && operation && secondNumberFirstEdit && !numbers[1]) {
        return false;
      }

      return true;
    },
    [firstNumberFirstEdit, operation, secondNumberFirstEdit, numbers],
  );
  const handleDotPressed = useCallback(
    (stringNumber: string, value: string) => {
      if (
        dot === '.' &&
        ((!operation && !numbers[0].toString().includes('.')) ||
          (operation && !numbers[1].toString().includes('.')))
      ) {
        stringNumber = `.${value}`;
      }

      return stringNumber;
    },
    [dot, operation],
  );

  const handlePressedNumbers = useCallback(
    (stringNumber: string) => {
      if (!operation) {
        setFirstNumberFirstEdit(true);

        setNumbers(prevState => {
          prevState[0] = Number(`${prevState[0]}${stringNumber}`);
          return [...prevState];
        });
      } else {
        setSecondNumberFirstEdit(true);

        const newNumber = Number(`${numbers[1]}${stringNumber}`);
        setNumbers(prevState => {
          prevState[1] = newNumber;
          return [...prevState];
        });

        const resultValues = calculate(newNumber);
        setResult(resultValues!);
      }
    },
    [operation, calculate],
  );

  const handleDataCalculation = useCallback(
    (value: string) => {
      if (calculation.slice(-1) === operation && !numbers[1]) {
        const lastIndex = calculation.lastIndexOf(operation!);
        const replaced = calculation.substring(0, lastIndex) + value;
        setCalculation(replaced);
        setOperation(value);
        setDot('');

        return;
      }

      if (numbers[0] !== 0 && handleCalculationSlice(value)) {
        setCalculation(prevState => `${prevState}${value}`);
      }

      if (numbers[1] !== 0 && handleCalculationSlice(value)) {
        setNumbers([result, 0]);
        setCalculation(`${result}${value}`);
        setResult(0);
      }

      if (numbers[0] !== 0 && operation !== value) {
        setOperation(value);
        setDot('');
      }
    },
    [operation, numbers, calculation],
  );

  const handleNumbersPressed = useCallback(
    (value: string) => {
      let stringNumber = value;

      stringNumber = handleDotPressed(stringNumber, value);

      let isContinue = handleZerosPressed(value);

      if (isContinue) {
        handlePressedNumbers(stringNumber);

        setCalculation(prevState => `${prevState}${value}`);
      }
    },
    [handleDotPressed, handleZerosPressed, handlePressedNumbers],
  );

  const handleNotNumbersButtons = useCallback(
    (value: string) => {
      if (value === 'AC') {
        handleCleanButton();
        return;
      }

      if (value === '.') {
        handleDotButton(value);
        return;
      }

      if (value === '%') {
        handlePercentage(value);
        return;
      }

      if (value === '+') {
        handleDataCalculation(value);
        return;
      }

      if (value === '-') {
        handleDataCalculation(value);
        return;
      }

      if (value === '/') {
        handleDataCalculation(value);
        return;
      }

      if (value === 'x') {
        handleDataCalculation(value);
        return;
      }

      if (value === '=' && numbers[0] !== 0) {
        handleEqualButton();
      }
    },
    [
      handleCleanButton,
      handleDotButton,
      handlePercentage,
      handleDataCalculation,
      numbers,
    ],
  );

  const handleButtonPressed = useCallback(
    (value: string) => {
      if (isNaN(Number(value))) {
        handleNotNumbersButtons(value);
      } else {
        handleNumbersPressed(value);
      }
    },
    [operation, numbers, calculation, secondNumberFirstEdit],
  );

  return (
    <Container>
      <Display calculation={calculation} result={result} />

      <Buttons handleButtonPressed={handleButtonPressed} />
    </Container>
  );
};

export default Calculator;

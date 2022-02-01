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
  // tratamento para zeros
  const handleButtonPressed = useCallback(
    (value: string) => {
      if (isNaN(Number(value))) {
        if (value === 'AC') {
          setOperation(null);
          setCalculation('');
          setResult(0);
          setNumbers([0, 0]);
          setDot('');
          setPercentage('');
          return;
        }

        if (value === '.') {
          if (dot !== '' || calculation.slice(-1) === '%') {
            return;
          }

          if ((!numbers[0] && !operation) || (!numbers[1] && operation)) {
            setDot('.');
            setCalculation(prevState => `${prevState}0.`);
            return;
          }

          setDot('.');
          setCalculation(prevState => `${prevState}${value}`);
          return;
        }

        if (value === '%') {
          if (
            percentage !== '' ||
            calculation === '' ||
            (!operation && !numbers[0]) ||
            (operation && !numbers[1]) ||
            calculation.slice(-1) === '.'
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
          let resultValues: number;

          if (
            !numbers[1] &&
            (calculation.slice(-1) !== 'x' ||
              calculation.slice(-1) !== '/' ||
              calculation.slice(-1) !== '-' ||
              calculation.slice(-1) !== '/')
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
        }
      } else {
        let stringNumber = value;
        if (
          dot === '.' &&
          ((!operation && !numbers[0].toString().includes('.')) ||
            (operation && !numbers[1].toString().includes('.')))
        ) {
          stringNumber = `.${value}`;
        }

        if (!operation) {
          // if (value === '0' && numbers[0] === 0) {
          //   return;
          // }
          setNumbers(prevState => {
            prevState[0] = Number(`${prevState[0]}${stringNumber}`);
            return [...prevState];
          });
        } else {
          // if (value === '0' && numbers[1] === 0) {
          //   return;
          // }
          const newNumber = Number(`${numbers[1]}${stringNumber}`);
          setNumbers(prevState => {
            prevState[1] = newNumber;
            return [...prevState];
          });

          const resultValues = calculate(newNumber);
          setResult(resultValues!);
        }

        setCalculation(prevState => `${prevState}${value}`);
      }
    },
    [operation, numbers, calculation],
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

      if (numbers[0] !== 0 && calculation.slice(-1) !== value) {
        setCalculation(prevState => `${prevState}${value}`);
      }

      if (numbers[1] !== 0 && calculation.slice(-1) !== value) {
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

  return (
    <Container>
      <Display calculation={calculation} result={result} />

      <Buttons handleButtonPressed={handleButtonPressed} />
    </Container>
  );
};

export default Calculator;

import { useState } from "react";
import './App.css';

function Key({ label, clickHandler }) {
  return (
    <button onClick={(e) => clickHandler(e, label)}>
      {label}
    </button>
  );
}

function Display({ value }) {
  return (
    <div className="Display">
      {value}
    </div>
  );
}

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [operand1, setOperand1] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clickHandler = (e, value) => {
    e.preventDefault();
    console.log(value);

    if (!isNaN(value)) {
      // Handle number inputs
      if (waitingForOperand) {
        setDisplayValue(String(value));
        setWaitingForOperand(false);
      } else {
        setDisplayValue(displayValue === "0" ? String(value) : displayValue + value);
      }
    } else if (value === "CLR") {
      // Handle clear input
      setDisplayValue("0");
      setOperand1(null);
      setOperator(null);
      setWaitingForOperand(false);
    } else if (value === "=") {
      // Handle calculation
      if (operator && operand1 !== null) {
        const result = calculate(operand1, parseFloat(displayValue), operator);
        setDisplayValue(String(result));
        setOperand1(null);
        setOperator(null);
        setWaitingForOperand(true);
      }
    } else {
      // Handle operator inputs
      if (operator && !waitingForOperand) {
        const result = calculate(operand1, parseFloat(displayValue), operator);
        setDisplayValue(String(result));
        setOperand1(result);
      } else {
        setOperand1(parseFloat(displayValue));
      }
      setOperator(value);
      setWaitingForOperand(true);
    }
  };

  const calculate = (operand1, operand2, operator) => {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand2 !== 0 ? operand1 / operand2 : "Error";
      default:
        return operand2;
    }
  };

  return (
    <div className="App">
      <div className="Calc">
        <div className="Dsply">
          <Display value={displayValue} />
        </div>

        <div className="Bttns">
          <Key label={7} clickHandler={clickHandler} />
          <Key label={8} clickHandler={clickHandler} />
          <Key label={9} clickHandler={clickHandler} />
          <Key label={"/"} clickHandler={clickHandler} />
          <Key label={4} clickHandler={clickHandler} />
          <Key label={5} clickHandler={clickHandler} />
          <Key label={6} clickHandler={clickHandler} />
          <Key label={"*"} clickHandler={clickHandler} />
          <Key label={1} clickHandler={clickHandler} />
          <Key label={2} clickHandler={clickHandler} />
          <Key label={3} clickHandler={clickHandler} />
          <Key label={"-"} clickHandler={clickHandler} />
          <Key label={"CLR"} clickHandler={clickHandler} />
          <Key label={0} clickHandler={clickHandler} />
          <Key label={"="} clickHandler={clickHandler} />
          <Key label={"+"} clickHandler={clickHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;

// src/Calculator.js
import React, { useState } from 'react';

const Calculator = () => {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [result, setResult] = useState(null);

    const handleAddition = () => {
        setResult(parseFloat(num1) + parseFloat(num2));
    };

    const handleSubtraction = () => {
        setResult(parseFloat(num1) - parseFloat(num2));
    };

    const handleMultiplication = () => {
        setResult(parseFloat(num1) * parseFloat(num2));
    };

    const handleDivision = () => {
        if (num2 === "0") {
            alert("Cannot divide by zero!");
            return;
        }
        setResult(parseFloat(num1) / parseFloat(num2));
    };

    return (
        <div data-testid="test-calculator">
            <input
                type="number"
                value={num1}
                onChange={e => setNum1(e.target.value)}
                placeholder="First Number"
            />
            <input
                type="number"
                value={num2}
                onChange={e => setNum2(e.target.value)}
                placeholder="Second Number"
            />
            <button onClick={handleAddition}>+</button>
            <button onClick={handleSubtraction}>-</button>
            <button onClick={handleMultiplication}>×</button>
            <button onClick={handleDivision}>÷</button>
            <div>Result: {result}</div>
        </div>
    );
};

export default Calculator;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import Calculator from '../Calculator';

describe('Calculator Component', () => {

    test('renders calculator correctly', () => {
        render(<Calculator />);
        const calculatorElement = screen.getByTestId('test-calculator');
        expect(calculatorElement).toBeInTheDocument();
    });

    test('addition works correctly', () => {
        render(<Calculator />);

        const num1Input = screen.getByPlaceholderText('First Number');
        const num2Input = screen.getByPlaceholderText('Second Number');
        const addButton = screen.getByText('+');

        fireEvent.change(num1Input, { target: { value: '5' } });
        fireEvent.change(num2Input, { target: { value: '3' } });
        fireEvent.click(addButton);

        const result = screen.getByText('Result: 8');
        expect(result).toBeInTheDocument();
    });

    // You can similarly write tests for subtraction, multiplication, and division

    test('division by zero shows alert', () => {
        render(<Calculator />);

        const num1Input = screen.getByPlaceholderText('First Number');
        const num2Input = screen.getByPlaceholderText('Second Number');
        const divideButton = screen.getByText('÷');

        fireEvent.change(num1Input, { target: { value: '5' } });
        fireEvent.change(num2Input, { target: { value: '0' } });

        // Mock the window.alert function
        window.alert = jest.fn();

        fireEvent.click(divideButton);

        expect(window.alert).toHaveBeenCalledWith('Cannot divide by zero!');
    });

});


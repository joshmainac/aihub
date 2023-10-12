const assert = require('assert');
const Calc = require('../src/Calc');

describe("testing Calc", () => {

    it("should add two numbers correctly", () => {
        let calc = new Calc();
        assert.equal(calc.add(2, 3), 5);
    });

    it("should subtract two numbers correctly", () => {
        let calc = new Calc();
        assert.equal(calc.subtract(5, 3), 2);
    });

    it("should multiply two numbers correctly", () => {
        let calc = new Calc();
        assert.equal(calc.multiply(2, 3), 6);
    });

    it("should divide two numbers correctly", () => {
        let calc = new Calc();
        assert.equal(calc.divide(6, 3), 2);
    });

    it("should throw error when dividing by zero", () => {
        let calc = new Calc();
        assert.throws(() => {
            calc.divide(6, 0);
        }, /Division by zero is not allowed./);
    });
});

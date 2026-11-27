const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('addition', () => {
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('números negativos', () => expect(add(-2, -3)).toBe(-5));
  test('positivo + negativo', () => expect(add(5, -8)).toBe(-3));
  test('zero é elemento neutro', () => expect(add(7, 0)).toBe(7));
  test('decimais', () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
  test('números grandes', () => expect(add(1e15, 1e15)).toBe(2e15));
});

describe('subtraction', () => {
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
  test('resultado negativo', () => expect(subtract(4, 10)).toBe(-6));
  test('número negativo', () => expect(subtract(5, -3)).toBe(8));
  test('subtrair zero', () => expect(subtract(9, 0)).toBe(9));
  test('decimais', () => expect(subtract(0.3, 0.1)).toBeCloseTo(0.2));
});

describe('multiplication', () => {
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
  test('multiplicar por zero', () => expect(multiply(123, 0)).toBe(0));
  test('multiplicar por um', () => expect(multiply(7, 1)).toBe(7));
  test('sinais diferentes', () => expect(multiply(-3, 4)).toBe(-12));
  test('dois negativos', () => expect(multiply(-3, -4)).toBe(12));
  test('decimais', () => expect(multiply(0.5, 0.5)).toBeCloseTo(0.25));
});

describe('division', () => {
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
  test('resultado decimal', () => expect(divide(7, 2)).toBe(3.5));
  test('sinais diferentes', () => expect(divide(-10, 2)).toBe(-5));
  test('dois negativos', () => expect(divide(-10, -2)).toBe(5));
  test('zero dividido por número', () => expect(divide(0, 5)).toBe(0));
  test('divisão por zero lança erro', () => {
    expect(() => divide(10, 0)).toThrow('Divisão por zero não é permitida.');
  });
  test('0 / 0 lança erro', () => {
    expect(() => divide(0, 0)).toThrow();
  });
});

describe('calculate', () => {
  test.each([
    [2, '+', 3, 5],
    [10, '-', 4, 6],
    [45, '*', 2, 90],
    [45, 'x', 2, 90],
    [20, '/', 5, 4],
    [2, 'add', 3, 5],
    [10, 'subtract', 4, 6],
    [45, 'multiply', 2, 90],
    [20, 'divide', 5, 4],
  ])('%p %s %p = %p', (a, op, b, expected) => {
    expect(calculate(a, op, b)).toBe(expected);
  });

  test('operação inválida lança erro', () => {
    expect(() => calculate(1, '%', 2)).toThrow('Operação inválida');
  });

  test('divisão por zero via calculate lança erro', () => {
    expect(() => calculate(1, '/', 0)).toThrow('Divisão por zero');
  });
});

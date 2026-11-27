#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   - Adição        (add, +)
 *   - Subtração     (subtract, -)
 *   - Multiplicação (multiply, x, *)
 *   - Divisão       (divide, /)
 *
 * Uso:
 *   node src/calculator.js <numero1> <operacao> <numero2>
 *
 * Exemplos:
 *   node src/calculator.js 6 add 3
 *   node src/calculator.js 6 x 3
 *   node src/calculator.js 6 / 3
 */

// Adição: retorna a + b
function add(a, b) {
  return a + b;
}

// Subtração: retorna a - b
function subtract(a, b) {
  return a - b;
}

// Multiplicação: retorna a * b
function multiply(a, b) {
  return a * b;
}

// Divisão: retorna a / b (divisão por zero lança erro)
function divide(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = {
  add, '+': add,
  subtract, '-': subtract,
  multiply, x: multiply, '*': multiply,
  divide, '/': divide,
};

function calculate(a, op, b) {
  const fn = operations[op];
  if (!fn) {
    throw new Error(`Operação inválida: "${op}". Use add, subtract, multiply ou divide.`);
  }
  return fn(a, b);
}

function main() {
  const [rawA, op, rawB] = process.argv.slice(2);
  if (rawA === undefined || op === undefined || rawB === undefined) {
    console.error('Uso: node src/calculator.js <numero1> <operacao> <numero2>');
    console.error('Operações: add (+), subtract (-), multiply (x, *), divide (/)');
    process.exit(1);
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Erro: os operandos devem ser números.');
    process.exit(1);
  }

  try {
    console.log(calculate(a, op, b));
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, calculate };

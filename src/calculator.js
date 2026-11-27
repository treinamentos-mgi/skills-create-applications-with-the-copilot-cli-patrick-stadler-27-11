#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   - Adição        (addition, +)
 *   - Subtração     (subtraction, -)
 *   - Multiplicação (multiplication, x, *)
 *   - Divisão       (division, /)
 *
 * Uso:
 *   node src/calculator.js <numero1> <operacao> <numero2>
 *
 * Exemplos:
 *   node src/calculator.js 6 addition 3
 *   node src/calculator.js 6 x 3
 *   node src/calculator.js 6 / 3
 */

// Adição: retorna a + b
function addition(a, b) {
  return a + b;
}

// Subtração: retorna a - b
function subtraction(a, b) {
  return a - b;
}

// Multiplicação: retorna a * b
function multiplication(a, b) {
  return a * b;
}

// Divisão: retorna a / b (divisão por zero lança erro)
function division(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = {
  addition, '+': addition,
  subtraction, '-': subtraction,
  multiplication, x: multiplication, '*': multiplication,
  division, '/': division,
};

function calculate(a, op, b) {
  const fn = operations[op];
  if (!fn) {
    throw new Error(`Operação inválida: "${op}". Use addition, subtraction, multiplication ou division.`);
  }
  return fn(a, b);
}

function main() {
  const [rawA, op, rawB] = process.argv.slice(2);
  if (rawA === undefined || op === undefined || rawB === undefined) {
    console.error('Uso: node src/calculator.js <numero1> <operacao> <numero2>');
    console.error('Operações: addition (+), subtraction (-), multiplication (x, *), division (/)');
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

module.exports = { addition, subtraction, multiplication, division, calculate };

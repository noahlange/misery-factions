import DrollFormula from './DrollFormula';
import DrollResult from './DrollResult';

/**
 * Parse the formula into its component pieces.
 * Returns a DrollFormula object on success or null on failure.
 */
export function parse(formula: string) {
  const result = new DrollFormula();
  const pieces = formula.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i) as any;
  if (!pieces) {
    return pieces;
  }
  result.numDice = pieces[1] - 0 || 1;
  result.numSides = pieces[2] - 0;
  result.modifier = pieces[3] - 0 || 0;
  result.minResult = result.numDice * 1 + result.modifier;
  result.maxResult = result.numDice * result.numSides + result.modifier;
  result.avgResult = (result.maxResult + result.minResult) / 2;
  return result;
};
/**
 * Test the validity of the formula.
 * Returns true on success or false on failure.
 */
export function validate(formula: string) {
  return !!parse(formula);
};
/**
 * Roll the dice defined by the formula.
 * Returns a DrollResult object on success or false on failure.
 */
export function roll(rand: any, formula: string) {
  let pieces = null;
  const result = new DrollResult();
  pieces = parse(formula);
  if (!pieces) {
    return pieces;
  }
  for (let a = 0; a < pieces.numDice; a++) {
    const num = rand(pieces.numSides);
    result.rolls[a] = 1 + Math.floor(num);
  }
  result.modifier = pieces.modifier;
  for (const res of result.rolls) {
    result.total += res;
  }
  result.total += result.modifier;
  return result;
};

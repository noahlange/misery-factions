export default class DrollResult {
  toString() {
    if (this.rolls.length === 1 && this.modifier === 0) {
      return this.rolls[0] + '';
    }
    if (this.rolls.length > 1 && this.modifier === 0) {
      return this.rolls.join(' + ') + ' = ' + this.total;
    }
    if (this.rolls.length === 1 && this.modifier > 0) {
      return this.rolls[0] + ' + ' + this.modifier + ' = ' + this.total;
    }
    if (this.rolls.length > 1 && this.modifier > 0) {
      return (
        this.rolls.join(' + ') + ' + ' + this.modifier + ' = ' + this.total
      );
    }
    if (this.rolls.length === 1 && this.modifier < 0) {
      return (
        this.rolls[0] + ' - ' + Math.abs(this.modifier) + ' = ' + this.total
      );
    }
    if (this.rolls.length > 1 && this.modifier < 0) {
      return (
        this.rolls.join(' + ') +
        ' - ' +
        Math.abs(this.modifier) +
        ' = ' +
        this.total
      );
    }
  }
  constructor() {
    this.rolls = [];
    this.modifier = 0;
    this.total = 0;
  }
};

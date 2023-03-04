class State {
  init() {
    this.firstNumber = '0';
    this.secondNumber = '0';
    this.operation = 'add'; // 'add' | 'subtract' | 'multiply' | 'divide'
    this.target = 'first'; // 'first | 'second'
    this.equalWasPressed = false;
    this.operationWasPressed = false;
  }

  _processString(string) {
    // Remove first char if '0' and second char is not '.'
    if (string[0] === '0' && string[1] !== '.') string = string.slice(1);

    // Remove additional periods
    string = string.split('.');
    if (string.length > 1) string.splice(1, 0, '.');
    string = string.join('');

    return string;
  }

  addToTarget(newNumber, target = null) {
    // Set target if not specified
    if (!target) target = this.target;
    // Get current number
    let currentNumber = this[`${target}Number`];
    // If undefined, turn into string zero
    if (currentNumber === undefined) currentNumber = '0';
    // Concatenate strings
    let rawString = currentNumber + newNumber;
    // Process string to look like a real number
    const finalNumber = this._processString(rawString);
    // Save formatted string into target
    this[`${target}Number`] = finalNumber;
  }

  setTarget(string, target = null) {
    // Set target if not specified
    if (!target) target = this.target;
    // Save formatted string into target
    this[`${target}Number`] = string;
  }

  toggleNegativeTarget(target) {
    // Situations in which this operation is Not Valid
    if (this[`${this.target}Number`] === '0') return false;
    if (this.equalWasPressed && !this.operationWasPressed) return false;

    // Set target if not specified
    if (!target) target = this.target;
    // Get current target
    let currentTarget = this[`${target}Number`];
    // Toggle negative sign
    if (currentTarget.search('-') === -1) {
      currentTarget = '-' + currentTarget;
    } else {
      currentTarget = currentTarget.substring(1);
    }
    // Set value
    this[`${target}Number`] = currentTarget;
    // Return as Valid
    return true;
  }

  getTargetWithLastCharRemoved(target = null) {
    // Set target if not specified
    if (!target) target = this.target;

    // Sometimes second number is undefined, in that case return earlier
    if (this[`${target}Number`] === undefined) return undefined;

    let newString = this[`${target}Number`].slice(0, -1);
    if (newString === '') newString = '0';
    return newString;
  }

  calculate() {
    let result;
    switch (this.operation) {
      case 'add':
        result = +this.firstNumber + +this.secondNumber;
        break;
      case 'subtract':
        result = +this.firstNumber - +this.secondNumber;
        break;
      case 'multiply':
        result = +this.firstNumber * +this.secondNumber;
        break;
      case 'divide':
        result = +this.firstNumber / +this.secondNumber;
        break;
    }
    if (isNaN(result)) result = 'Error';
    return result.toString();
  }
};

export default new State();
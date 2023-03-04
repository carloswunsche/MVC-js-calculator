import state from './model.js';
import view from './view.js';

function controlAfterLoading() {
  // Reset App
  state.init();
  // Render Display
  view.render(state[`${state.target}Number`]);
  // Add remaining handlers
  addRemainingHandlers();
}

function controlSetCurrentNumber(number) {
  if (state.equalWasPressed && !state.operationWasPressed) {
    state.init();
  }

  // Update targeted number
  state.addToTarget(number);

  // Update view
  view.render(state[`${state.target}Number`]);
  debug();
}

function controlSetOperation(operation) {
  state.operationWasPressed = true;

  // If target is 'first'
  if (state.target === 'first') {
    state.operation = operation;
    state.target = 'second';
    debug();
    return;
  }

  // If target is 'second' and equal was pressed before
  if (state.target === 'second' && state.equalWasPressed) {
    // state.equalWasPressed = false;
    state.operation = operation;
    state.secondNumber = undefined;
    debug();
    return;
  }

  if (state.target === 'second') {
    state.firstNumber = state.calculate();
    view.render(state.firstNumber);
    state.secondNumber = '0';
    state.operation = operation;
    debug();
    return;
  }
}

function controlSetEqual() {
  // If pressed during first number, return
  if (state.target === 'first') return;
  // If second number is undefined, return
  if (state.secondNumber === undefined) return;

  state.equalWasPressed = true;
  state.operationWasPressed = false;
  state.firstNumber = state.calculate();
  view.render(state.firstNumber);
  debug();
}

function controlSetNegative() {
  const isValid = state.toggleNegativeTarget();
  if (!isValid) return;
  view.render(state[`${state.target}Number`]);
  debug();
}

function controlDelete() {
  // Delete character
  const newString = state.getTargetWithLastCharRemoved();
  if (newString === undefined) return;
  // Update current target
  state.setTarget(newString);
  // Render
  view.render(state[`${state.target}Number`]);
  debug();
}

function controlResetApp() {
  console.clear();
  state.init();
  view.render(state[`${state.target}Number`]);
  debug();
}

function debug() {
  // console.clear();
  // console.log(`CURRENT: ${state.target}`);
  // console.log(`firstNumber: ${state.firstNumber}`);
  // console.log(`operation: ${state.operation}`);
  // console.log(`secondNumber: ${state.secondNumber}`);
  // console.log(`equal Pressed?: ${state.equalWasPressed}`);
  // console.log(`operation Pressed?: ${state.operationWasPressed}`);
}

/* -------------------- On load -------------------- */
(function () {
  view.addHandlerOnLoad(controlAfterLoading);
})();

function addRemainingHandlers() {
  // When user presses a number
  view.addHandlerOnNumberPress(controlSetCurrentNumber);

  // When user presses an operation
  view.addHandlerOnOperationPress(controlSetOperation);

  // When user presses equal button
  view.addHandlerOnEqualPress(controlSetEqual);

  // When user presses +/- button
  view.addHandlerOnNegativePress(controlSetNegative);

  // When user presses the delete button
  view.addHandlerOnDeletePress(controlDelete);

  // When user presses the reset button
  view.addHandlerOnResetPress(controlResetApp);
}

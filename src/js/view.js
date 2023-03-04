class View {
  _numbers = document.querySelectorAll('[data-number]');
  _operators = document.querySelectorAll('[data-operator]');
  _equal = document.querySelector('[data-equal]');
  _reset = document.querySelector('[data-reset]');
  _negative = document.querySelector('[data-negative]');
  _output = document.querySelector('[data-output]');

  addHandlerOnLoad(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerOnNumberPress(handler) {
    Array.from(this._numbers).forEach(btn =>
      btn.addEventListener('click', () => {
        handler(btn.dataset.number);
      })
    );
  }

  addHandlerOnOperationPress(handler) {
    Array.from(this._operators).forEach(btn =>
      btn.addEventListener('click', () => {
        handler(btn.dataset.operator);
      })
    );
  }

  addHandlerOnEqualPress(handler) {
    this._equal.addEventListener('click', handler);
  }

  addHandlerOnNegativePress(handler) {
    this._negative.addEventListener('click', handler);
  }

  addHandlerOnDeletePress(handler) {
    window.addEventListener('keydown', e => {
      if (e.code === 'Backspace') handler();
    });
  }

  addHandlerOnResetPress(handler) {
    this._reset.addEventListener('click', handler);
  }

  render(number) {
    this._output.innerHTML = number;
  }
}

export default new View();

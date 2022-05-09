import './button.css';

class Button {
  constructor(parent, app, options) {
    this.app = app;
    this.parent = parent;
    this.options = options;
    this.element = document.createElement('button');
    this.currentValue = options.ruValue;
    this.code = this.options.code;
  }

  render() {
    this.element.style.width = `${this.options.width}px`;
    this.element.style.height = '40px';
    if (this.options.command) {
      this.element.innerText = this.options.command;
    } else {
      this.element.innerText = this.options.ruValue;
    }
    this.element.classList.add('button');
    this.parent.append(this.element);
    this.addEventListeners();
  }

  makeUpperCase() {
    if (!this.options.command) {
      if (this.app.keyboard.isRu) {
        this.element.innerText = this.options.ruShiftValue;
      } else {
        this.element.innerText = this.options.enShiftValue;
      }
    }
  }

  makeLowerCase() {
    if (!this.options.command) {
      if (this.app.keyboard.isRu) {
        this.element.innerText = this.options.ruValue;
      } else {
        this.element.innerText = this.options.enValue;
      }
    }
  }

  makeRu() {
    if (!this.options.command) {
      if (this.app.keyboard.isCapsLock) {
        this.element.innerText = this.options.ruShiftValue;
      } else {
        this.element.innerText = this.options.ruValue;
      }
    }
  }

  makeEn() {
    if (!this.options.command) {
      if (this.app.keyboard.isCapsLock) {
        this.element.innerText = this.options.enShiftValue;
      } else {
        this.element.innerText = this.options.enValue;
      }
    }
  }

  addEventListeners() {
    this.element.addEventListener('mousedown', () => {
      this.active = true;
      this.app.onKeyPressed(this.options.code);
    });
    this.element.addEventListener('mouseup', () => {
      this.active = false;
      this.app.onKeyReleased(this.options.code);
    });
    this.element.addEventListener('mouseout', () => {
      this.active = false;
      this.app.onKeyReleased(this.options.code);
    });
  }

  set active(val) {
    if (val) {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }
}

export default Button;

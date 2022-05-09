import './keyboard.css';
import Button from '../button/button';
import buttons from '../../buttons';

class Keyboard {
  constructor(parent, app) {
    this.app = app;
    this.parent = parent;
    this.element = document.createElement('div');
    this.buttons = [];
    this.isShiftPressed = false;
    this.isCapsLock = false;
    this.isRu = true;
    this.pressedButtons = new Set();
  }

  render() {
    this.element.classList.add('keyboard');
    this.parent.append(this.element);
    this.addButtons();
  }

  addButtons() {
    buttons.forEach((buttonOptions) => {
      const button = new Button(this.element, this.app, buttonOptions);
      this.buttons.push(button);
      button.render();
    });
  }

  changeLanguage() {
    this.isRu = !this.isRu;
    if (this.isRu) {
      this.makeRu();
    } else {
      this.makeEn();
    }
  }

  makeEn() {
    this.buttons.forEach((button) => {
      button.makeEn();
    });
  }

  makeRu() {
    this.buttons.forEach((button) => {
      button.makeRu();
    });
  }

  onShiftPressed() {
    this.isShiftPressed = true;
    this.buttons.forEach((button) => {
      button.makeUpperCase();
    });
  }

  onShiftReleased() {
    this.isShiftPressed = false;
    this.buttons.forEach((button) => {
      button.makeLowerCase();
    });
  }

  onCapsLockPressed() {
    this.isCapsLock = !this.isCapsLock;
    if (this.isCapsLock) {
      this.onShiftPressed();
    } else {
      this.onShiftReleased();
    }
  }
}

export default Keyboard;

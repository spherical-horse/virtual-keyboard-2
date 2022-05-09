import './normalize.css';
import './app.css';
import Wrapper from './components/wrapper/wrapper';
import Header from './components/header/header';
import Textarea from './components/textarea/textarea';
import Keyboard from './components/keyboard/keyboard';
import Footer from './components/footer/footer';
import buttons from './buttons';

class App {
  constructor(root) {
    this.root = root;
  }

  run() {
    this.wrapper = new Wrapper(this.root);
    this.wrapper.render();
    this.header = new Header(this.wrapper.element);
    this.header.render();
    this.textarea = new Textarea(this.wrapper.element, this);
    this.textarea.render();
    this.textarea.element.focus();
    this.keyboard = new Keyboard(this.wrapper.element, this);
    this.keyboard.render();
    this.footer = new Footer(this.wrapper.element);
    this.footer.render();
    this.initEventListeners();
  }

  get isSelected() {
    return this.textarea.element.selectionStart !== this.textarea.element.selectionEnd;
  }

  get cursorPosition() {
    if (this.isSelected) {
      return [this.textarea.element.selectionStart, this.textarea.element.selectionEnd];
    }
    return this.textarea.element.selectionStart;
  }

  onKeyPressed(code) {
    const buttonObj = App.search(code);
    this.keyboard.pressedButtons.add(buttonObj.command);
    const button = this.searchButton(code);
    button.active = true;
    if (this.keyboard.isRu) {
      if (this.keyboard.isShiftPressed || this.keyboard.isCapsLock) {
        this.textarea.element.value += buttonObj.ruShiftValue;
      } else {
        this.textarea.element.value += buttonObj.ruValue;
      }
    } else if (!this.keyboard.isRu) {
      if (this.keyboard.isShiftPressed || this.keyboard.isCapsLock) {
        this.textarea.element.value += buttonObj.enShiftValue;
      } else {
        this.textarea.element.value += buttonObj.enValue;
      }
    }
    if (buttonObj.command === 'Shift') {
      if (this.keyboard.pressedButtons.has('Alt')) {
        this.keyboard.changeLanguage();
      }
      this.keyboard.onShiftPressed();
    }
    if (buttonObj.command === 'CapsLock') {
      this.keyboard.onCapsLockPressed();
    }
    if (buttonObj.command === 'Alt' && this.keyboard.pressedButtons.has('Shift')) {
      this.keyboard.changeLanguage();
    }
    if (buttonObj.command === 'Backspace') {
      const arr = [...this.textarea.element.value];
      if (this.textarea.cursorPosition > 0) {
        arr.splice(this.textarea.cursorPosition - 1, 1);
        const currentPosition = this.textarea.cursorPosition;
        this.textarea.element.value = arr.join('');
        this.textarea.cursorPosition = currentPosition - 1;
      }
    }
    if (buttonObj.command === 'Del') {
      const arr = [...this.textarea.element.value];
      arr.splice(this.textarea.cursorPosition, 1);
      const currentPosition = this.textarea.cursorPosition;
      this.textarea.element.value = arr.join('');
      this.textarea.cursorPosition = currentPosition;
    }
    if (buttonObj.code === 'ArrowLeft') {
      if (this.textarea.cursorPosition > 0) this.textarea.cursorPosition -= 1;
    }
    if (buttonObj.code === 'ArrowRight') {
      if (!this.textarea.isCursorAtEnd) this.textarea.cursorPosition += 1;
    }
  }

  onKeyReleased(code) {
    const buttonObj = App.search(code);
    const button = this.searchButton(code);
    button.active = false;
    this.keyboard.pressedButtons.delete(buttonObj.command);
    if (buttonObj.command === 'Shift' && !this.keyboard.isCapsLock) {
      this.keyboard.onShiftReleased();
    }
  }

  static search(code) {
    let res;
    buttons.forEach((item) => {
      if (item.code === code) {
        res = item;
      }
    });
    return res;
  }

  searchButton(code) {
    let res;
    this.keyboard.buttons.forEach((button) => {
      if (button.code === code) res = button;
    });
    return res;
  }

  initEventListeners() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.onKeyPressed(e.code);
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.onKeyReleased(e.code);
    });
    this.textarea.element.addEventListener('blur', () => {
      this.textarea.element.focus();
    });
  }
}

export default App;

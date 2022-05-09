import './textarea.css';

class Textarea {
  constructor(parent, app, rows = 10, cols = 50) {
    this.app = app;
    this.parent = parent;
    this.element = document.createElement('textarea');
    this.rows = rows;
    this.cols = cols;
  }

  render() {
    this.element.classList.add('textarea');
    this.element.rows = this.rows;
    this.element.cols = this.cols;
    this.parent.append(this.element);
  }

  get cursorPosition() {
    return this.element.selectionStart;
  }

  set cursorPosition(val) {
    this.element.selectionStart = val;
    this.element.selectionEnd = val;
  }

  get isCursorAtEnd() {
    return this.cursorPosition === this.element.value.length;
  }
}

export default Textarea;

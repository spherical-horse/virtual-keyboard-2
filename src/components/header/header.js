import './header.css';

class Header {
  constructor(parent) {
    this.parent = parent;
    this.element = document.createElement('h1');
  }

  render() {
    this.element.classList.add('header');
    this.element.innerText = 'Виртуальная клавиатура';
    this.parent.append(this.element);
  }
}

export default Header;

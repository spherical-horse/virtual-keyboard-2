import './footer.css';

class Footer {
  constructor(parent) {
    this.parent = parent;
    this.element = document.createElement('div');
  }

  render() {
    this.element.classList.add('footer');
    this.element.innerHTML = `
      <p>Клавиатура создана в ОС Ubuntu Linux</p>
      <p>Язык переключается клавишами Alt+Shift</p>
    `;
    this.parent.append(this.element);
  }
}

export default Footer;

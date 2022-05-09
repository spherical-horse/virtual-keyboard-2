import './wrapper.css';

class Wrapper {
  constructor(parent) {
    this.parent = parent;
    this.element = document.createElement('div');
  }

  render() {
    this.element.classList.add('wrapper');
    this.parent.append(this.element);
  }
}

export default Wrapper;

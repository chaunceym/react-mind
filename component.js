class Component {
  constructor(props = {}) {
    this.props = props;
  }
  setState(state) {
    const oldEl = this.el;
    this.state = state;
    this._renderDOM();
    if (this.onStateChange) this.onStateChange(oldEl, this.el);
  }
  createDOMFromString = (domStr) => {
    const div = document.createElement("div");
    div.innerHTML = domStr;
    return div;
  };
  _renderDOM() {
    this.el = this.createDOMFromString(this.render());
    if (this.onClick) {
      this.el.addEventListener("click", this.onClick.bind(this), false);
    }
    return this.el;
  }
}

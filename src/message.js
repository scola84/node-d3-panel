import { select } from 'd3-selection';

export default class PanelMessage {
  constructor() {
    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola message', true)
      .styles({
        'align-items': 'center',
        'background': 'inherit',
        'color': '#AAA',
        'display': 'flex',
        'font-size': '2em',
        'height': '100%',
        'left': 0,
        'justify-content': 'center',
        'text-align': 'center',
        'top': 0,
        'position': 'absolute',
        'width': '100%',
        'z-index': 1
      });
  }

  destroy() {
    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  text(text) {
    this._root.text(text);
    return this;
  }
}

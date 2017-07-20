import { select } from 'd3';
import Resizer from 'element-resize-detector';
import debounce from 'lodash-es/debounce';
import { controlBar } from '@scola/d3-control';
import { Observer } from '@scola/d3-model';

export default class Panel extends Observer {
  constructor() {
    super();

    this._header = null;
    this._footer = null;
    this._message = null;

    this._height = 0;
    this._width = 0;

    this._disabled = false;

    this._resizer = Resizer({
      callOnAdd: false
    });

    this._root = select('body')
      .append('form')
      .remove()
      .classed('scola panel', true)
      .attrs({
        'method': 'POST',
        'novalidate': 'novalidate'
      })
      .styles({
        'height': '100%',
        'position': 'absolute',
        'width': '100%'
      });

    this._fieldset = this._root
      .append('fieldset')
      .styles({
        'border': 0,
        'margin': 0,
        'padding': 0
      });

    this._wrapper = this._fieldset
      .append('div')
      .classed('scola wrapper', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%',
        'position': 'absolute',
        'width': '100%',
      });

    this._body = this._wrapper
      .append('div')
      .classed('scola body', true)
      .styles({
        'background': '#EEE',
        'flex': '1 1 0%',
        'overflow': 'auto',
        'padding': '2em 0 0 0',
        'position': 'relative',
        '-webkit-overflow-scrolling': 'touch'
      });

    this._handleResize = debounce(() => this._resize(), 100);
    this._handleSubmit = (e) => this._submit(e);

    this._bindRoot();
    this._bindResizer();
  }

  destroy() {
    super.destroy();

    this._unbindRoot();
    this._unbindResizer();

    this._deleteHeader();
    this._deleteFooter();
    this._deleteMessage();

    this._handleResize.cancel();
    this._handleResize = null;

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  body() {
    return this._body;
  }

  disabled(value = null) {
    if (value === null) {
      return this._disabled;
    }

    this._disabled = value;
    this._root.classed('disabled', value);

    if (this._footer !== null) {
      this._footer.disabled(value);
    }

    if (this._header !== null) {
      this._header.disabled(value);
    }

    return this;
  }

  header(action = true) {
    if (action === false) {
      return this._deleteHeader();
    }

    if (this._header === null) {
      this._insertHeader();
    }

    return this._header;
  }

  footer(action = true) {
    if (action === false) {
      return this._deleteFooter();
    }

    if (this._footer === null) {
      this._insertFooter();
    }

    return this._footer;
  }

  message(value = null) {
    if (value === null) {
      return this._message;
    }

    if (value === false) {
      return this._deleteMessage();
    }

    if (this._message) {
      return this._updateMessage(value);
    }

    return this._insertMessage(value);
  }

  append(element, action = true) {
    if (action === false) {
      return this._deleteElement(element);
    }

    return this._insertElement(element);
  }

  _bindRoot() {
    this._root.node().addEventListener('submit', this._handleSubmit);
  }

  _unbindRoot() {
    this._root.node().removeEventListener('submit', this._handleSubmit);
  }

  _bindResizer() {
    this._resizer.listenTo(this._body.node(), this._handleResize);
  }

  _unbindResizer() {
    this._resizer.uninstall(this._body.node());
  }

  _resize() {
    const height = this._body.boundingRect('height');
    const width = this._body.boundingRect('width');

    const changed =
      this._height !== height ||
      this._width !== width;

    this._height = height;
    this._width = width;

    this._root.dispatch('resize', {
      detail: changed
    });
  }

  _submit(event) {
    event.preventDefault();

    if (this._disabled === false && this._model) {
      this._model.set(this._name, this._value);
    }
  }

  _insertHeader() {
    this._header = controlBar();

    this._header.root()
      .classed('header', true)
      .styles({
        'border-bottom': '1px solid #CCC'
      });

    this._wrapper.node()
      .insertBefore(this._header.root().node(), this._body.node());

    return this;
  }

  _deleteHeader() {
    if (this._header) {
      this._header.destroy();
      this._header = null;
    }

    return this;
  }

  _insertFooter() {
    this._footer = controlBar();

    this._footer.root()
      .classed('footer', true)
      .styles({
        'border-top': '1px solid #CCC'
      });

    this._wrapper
      .append(() => this._footer.root().node());

    return this;
  }

  _deleteFooter() {
    if (this._footer) {
      this._footer.destroy();
      this._footer = null;
    }

    return this;
  }

  _insertMessage(text) {
    this._body
      .style('display', 'none');

    this._message = this._wrapper
      .append('div')
      .classed('scola message', true)
      .styles({
        'align-items': 'center',
        'background': '#EEE',
        'color': '#AAA',
        'display': 'flex',
        'flex': '1 1 0%',
        'font-size': '2em',
        'justify-content': 'center',
        'padding': '0 0.5em',
        'position': 'relative',
        'text-align': 'center'
      })
      .text(text);

    return this;
  }

  _updateMessage(text) {
    this._message.text(text);
    return this;
  }

  _deleteMessage() {
    if (this._message) {
      this._body
        .style('display', null);

      this._message.remove();
      this._message = null;
    }

    return this;
  }

  _insertElement(element) {
    this._body.append(() => element.root().node());
    return element;
  }

  _deleteElement(element) {
    element.root().remove();
    return element;
  }
}

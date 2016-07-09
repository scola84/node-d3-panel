import Panel from './src/panel';
import PanelButton from './src/button';
import PanelMessage from './src/message';

export function panel() {
  return new Panel();
}

export function panelButton() {
  return new PanelButton();
}

export function panelMessage() {
  return new PanelMessage();
}

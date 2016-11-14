import Panel from './src/panel';
import PanelMessage from './src/message';

export function panel() {
  return new Panel();
}

export function panelMessage() {
  return new PanelMessage();
}

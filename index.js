import Panel from './src/panel';
import PanelButton from './src/button';

export function panel() {
  return new Panel();
}

export function panelButton() {
  return new PanelButton();
}

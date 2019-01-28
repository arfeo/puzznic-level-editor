import { App } from './components/App';

import { globals } from './constants/globals';

window.onload = () => {
  globals.pageInstance = new App();
};

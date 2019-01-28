import { Editor } from './components/Editor';

import { APP } from './constants/global';

window.onload = () => {
  APP.pageInstance = new Editor();
};

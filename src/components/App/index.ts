import { globals } from '../../constants/globals';

import { setCellSize } from './utils';
import { renderEditorBoard, renderPanel } from './render';
import {
  setUpEventHandlers,
  removeEventHandlers,
  panelObjectClickHandler,
  panelActionClickHandler,
  gridCellClickHandler,
} from './events';

class App {
  editorBoardGrid: HTMLElement;
  editorPanel: HTMLElement;
  panelObjects: { [key: string]: HTMLElement };
  panelActions: {
    reset: HTMLElement;
    generate: HTMLElement;
  };
  cellSize: number;
  currentObject: number;
  currentMap: number[][];

  constructor() {
    this.editorBoardGrid = document.createElement('div');
    this.editorPanel = document.createElement('div');

    this.panelActions = {
      reset: document.createElement('div'),
      generate: document.createElement('div'),
    };

    this.currentObject = -1;
    this.cellSize = setCellSize();
    this.currentMap = [];

    this.resetMap();

    globals.eventListeners.onGridCellClick = gridCellClickHandler.bind(this);
    globals.eventListeners.onPanelObjectClick = panelObjectClickHandler.bind(this);
    globals.eventListeners.onPanelActionClick = panelActionClickHandler.bind(this);

    this.render();
  }

  render() {
    renderEditorBoard.call(this);
    renderPanel.call(this);

    setUpEventHandlers.call(this);
  }

  destroy() {
    removeEventHandlers.call(this);
  }

  resetMap() {
    for (let y = 0; y < 12; y += 1) {
      this.currentMap[y] = [];

      for (let x = 0; x < 10; x += 1) {
        this.currentMap[y].push(0);
      }
    }
  }
}

export { App };

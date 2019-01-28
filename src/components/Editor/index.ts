import { setCellSize } from '../../utils/common';
import { renderEditorBoard, renderPanel } from './render';
import { setUpEventHandlers, removeEventHandlers } from './events';

class Editor {
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

export { Editor };

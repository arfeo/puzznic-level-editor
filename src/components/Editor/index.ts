import { setCellSize } from '../../utils/common';
import { renderEditorBoard, renderPanel } from './render';
import { setUpEventHandlers, removeEventHandlers } from './events';

import { ILevel } from '../../types/editor';

class Editor {
  editorBoardGrid: HTMLElement;
  editorPanel: HTMLElement;
  panelObjects: { [key: string]: HTMLElement };
  panelActions: { [key: string]: HTMLElement };
  cellSize: number;
  selectedObject: number;
  level: ILevel;

  constructor() {
    this.cellSize = setCellSize();
    this.selectedObject = -1;
    this.level = {
      id: 1,
      map: [],
      blocks: [],
      target: [],
      bonus: 500,
      password: '',
    };

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
      this.level.map[y] = [];

      for (let x = 0; x < 10; x += 1) {
        this.level.map[y].push(0);
      }
    }
  }
}

export { Editor };

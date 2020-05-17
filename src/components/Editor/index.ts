import { CELL_SIZE_VMIN } from '../../constants/app';

import { setCellSize } from '../../utils/common';
import { renderEditorBoard, renderPanel } from './render';
import { setUpEventHandlers, removeEventHandlers } from './events';

import { Level } from '../../types/editor';

class Editor {
  editorBoardGrid: HTMLElement;
  editorPanel: HTMLElement;
  panelObjects: { [key: string]: HTMLElement };
  panelActions: { [key: string]: HTMLElement };
  cellSize: number;
  selectedObject: number;
  level: Level;

  constructor() {
    this.cellSize = setCellSize(CELL_SIZE_VMIN);
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

  render(): void {
    renderEditorBoard.call(this);
    renderPanel.call(this);

    setUpEventHandlers.call(this);
  }

  destroy(): void {
    removeEventHandlers.call(this);
  }

  resetMap(): void {
    for (let y = 0; y < 12; y += 1) {
      this.level.map[y] = Array(10).fill(0);
    }
  }
}

export { Editor };

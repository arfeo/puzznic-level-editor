import { GeneratedLevel } from '../GeneratedLevel';

import { APP } from '../../constants/global';
import { Actions, LevelObjects } from '../../constants/app';

import {
  renderEmptySpace,
  renderWall,
  renderBlock,
  renderTarget,
  clearCell,
} from './render';

import { excludeBlock } from './utils';

import { Block } from '../../types/editor';

/**
 * Function creates all the Editor's event listeners
 */
function setUpEventHandlers(): void {
  APP.eventListeners.onGridCellClick = gridCellClickHandler.bind(this);
  APP.eventListeners.onPanelObjectClick = panelObjectClickHandler.bind(this);
  APP.eventListeners.onPanelActionClick = panelActionClickHandler.bind(this);

  for (const key in this.panelObjects) {
    if (Object.prototype.hasOwnProperty.call(this.panelObjects, key)) {
      this.panelObjects[key].addEventListener('click', APP.eventListeners.onPanelObjectClick);
    }
  }

  for (const key in this.panelActions) {
    if (Object.prototype.hasOwnProperty.call(this.panelActions, key)) {
      this.panelActions[key].addEventListener('click', APP.eventListeners.onPanelActionClick);
    }
  }

  const cells: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(
    '.editorBoard .-grid .-cell'
  ) as NodeListOf<HTMLCanvasElement>;

  for (const key in cells) {
    if (Object.prototype.hasOwnProperty.call(cells, key)) {
      cells[key].addEventListener('click', APP.eventListeners.onGridCellClick);
    }
  }
}

/**
 * Function removes all the Editor's event listeners
 */
function removeEventHandlers(): void {
  for (const key in this.panelObjects) {
    if (Object.prototype.hasOwnProperty.call(this.panelObjects, key)) {
      this.panelObjects[key].removeEventListener('click', APP.eventListeners.onPanelObjectClick);
    }
  }

  for (const key in this.panelActions) {
    if (Object.prototype.hasOwnProperty.call(this.panelActions, key)) {
      this.panelActions[key].removeEventListener('click', APP.eventListeners.onPanelActionClick);
    }
  }

  const cells: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(
    '.editorBoard .-grid .-cell'
  ) as NodeListOf<HTMLCanvasElement>;

  for (const key in cells) {
    if (Object.prototype.hasOwnProperty.call(cells, key)) {
      cells[key].removeEventListener('click', APP.eventListeners.onGridCellClick);
    }
  }
}

/**
 * Function fires at the click event on a panel object
 *
 * @param event
 */
function panelObjectClickHandler(event: MouseEvent): void {
  const currentObject: HTMLElement = event.currentTarget as HTMLElement;

  for (const key in this.panelObjects) {
    if (Object.prototype.hasOwnProperty.call(this.panelObjects, key)) {
      this.panelObjects[key].classList.remove('active');
    }
  }

  currentObject.classList.add('active');

  this.selectedObject = parseInt(currentObject.getAttribute('key'), 10);
}

/**
 * Function fires at the click event on a panel action button
 *
 * @param event
 */
function panelActionClickHandler(event: MouseEvent): void {
  event.stopPropagation();

  const action: HTMLElement = event.target as HTMLElement;
  const actionType: string = action.getAttribute('action');

  switch (actionType) {
    case Actions.Reset: {
      if (confirm('Are you sure you want to reset current map?')) {
        this.level = {
          id: 1,
          map: [],
          blocks: [],
          target: [],
          bonus: 500,
          password: '',
        };

        const cells: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(
          '.editorBoard .-grid .-cell'
        ) as NodeListOf<HTMLCanvasElement>;

        for (const key in cells) {
          if (Object.prototype.hasOwnProperty.call(cells, key)) {
            const cellCanvas: HTMLCanvasElement = cells[key].querySelector<HTMLCanvasElement>('.-cell-canvas');
            const targetCanvas: HTMLCanvasElement = cells[key].querySelector<HTMLCanvasElement>('.-target-canvas');
            const cellCtx: CanvasRenderingContext2D = cellCanvas.getContext('2d');
            const targetCtx: CanvasRenderingContext2D = targetCanvas.getContext('2d');

            clearCell.call(this, cellCtx, targetCtx);
          }
        }

        this.resetMap();
      }
      break;
    }
    case Actions.Generate: {
      new GeneratedLevel(this);
      break;
    }
    default: break;
  }
}

/**
 * Function fires at the click event on the Editor's grid
 *
 * @param event
 */
function gridCellClickHandler(event: MouseEvent): void {
  event.stopPropagation();

  const currentTarget: HTMLElement = event.currentTarget as HTMLElement;
  const cellCanvas: HTMLCanvasElement = currentTarget.querySelector<HTMLCanvasElement>('.-cell-canvas');
  const targetCanvas: HTMLCanvasElement = currentTarget.querySelector<HTMLCanvasElement>('.-target-canvas');
  const cellCtx: CanvasRenderingContext2D = cellCanvas.getContext('2d');
  const targetCtx: CanvasRenderingContext2D = targetCanvas.getContext('2d');
  const cellX: number = parseInt(cellCanvas.getAttribute('x'), 10);
  const cellY: number = parseInt(cellCanvas.getAttribute('y'), 10);

  switch (this.selectedObject) {
    case LevelObjects.Nothing: {
      return clearCell.call(this, cellCtx, targetCtx);
    }
    case LevelObjects.Empty: {
      this.level.map[cellY][cellX] = this.selectedObject;

      return renderEmptySpace.call(this, cellCtx);
    }
    case LevelObjects.Wall: {
      this.level.map[cellY][cellX] = this.selectedObject;

      return renderWall.call(this, cellCtx);
    }
    case LevelObjects.Block1:
    case LevelObjects.Block2:
    case LevelObjects.Block3:
    case LevelObjects.Block4:
    case LevelObjects.Block5:
    case LevelObjects.Block6:
    case LevelObjects.Block7:
    case LevelObjects.Block8: {
      const blockPosition: number[] = [cellY, cellX];
      const blocksCloned: Block[] = excludeBlock.call(this, blockPosition);

      blocksCloned.push({
        id: blocksCloned.length + 1,
        type: this.selectedObject - 10,
        position: blockPosition,
      });

      this.level.map[cellY][cellX] = LevelObjects.Empty;
      this.level.blocks = JSON.parse(JSON.stringify(blocksCloned));

      return renderBlock.call(this, cellCtx, this.selectedObject - 10);
    }
    case LevelObjects.Target: {
      if (this.level.target.length > 0) {
        const previousTargetCanvas: HTMLCanvasElement = document.querySelector(
          `.editorBoard .-grid .-cell .-target-canvas[x="${this.level.target[1]}"][y="${this.level.target[0]}"]`
        ) as HTMLCanvasElement;

        clearCell.call(this, null, previousTargetCanvas.getContext('2d'));
      }

      this.level.target = [cellY, cellX];

      return renderTarget.call(this, targetCtx);
    }
    default: {
      return alert('There is nothing to insert: select an object from the panel');
    }
  }
}

export {
  setUpEventHandlers,
  removeEventHandlers,
};

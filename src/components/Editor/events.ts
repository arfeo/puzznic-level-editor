import { GeneratedMap } from '../GeneratedMap';

import { APP } from '../../constants/global';

import {
  renderEmptySpace,
  renderWall,
  renderBlock,
  renderTarget,
  clearCell,
} from './render';

/**
 * Function creates all the Editor's event listeners
 */
function setUpEventHandlers() {
  APP.eventListeners.onGridCellClick = gridCellClickHandler.bind(this);
  APP.eventListeners.onPanelObjectClick = panelObjectClickHandler.bind(this);
  APP.eventListeners.onPanelActionClick = panelActionClickHandler.bind(this);

  for (const key in this.panelObjects) {
    if (this.panelObjects.hasOwnProperty(key)) {
      this.panelObjects[key].addEventListener('click', APP.eventListeners.onPanelObjectClick);
    }
  }

  for (const key in this.panelActions) {
    if (this.panelActions.hasOwnProperty(key)) {
      this.panelActions[key].addEventListener('click', APP.eventListeners.onPanelActionClick);
    }
  }

  const cells: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(
    '.editorBoard .-grid .-cell .-canvas'
  ) as NodeListOf<HTMLCanvasElement>;

  for (const key in cells) {
    if (cells.hasOwnProperty(key)) {
      cells[key].addEventListener('click', APP.eventListeners.onGridCellClick);
    }
  }
}

/**
 * Function removes all the Editor's event listeners
 */
function removeEventHandlers() {
  for (const key in this.panelObjects) {
    if (this.panelObjects.hasOwnProperty(key)) {
      this.panelObjects[key].removeEventListener('click', APP.eventListeners.onPanelObjectClick);
    }
  }

  for (const key in this.panelActions) {
    if (this.panelActions.hasOwnProperty(key)) {
      this.panelActions[key].removeEventListener('click', APP.eventListeners.onPanelActionClick);
    }
  }

  const cells: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(
    '.editorBoard .-grid .-cell .-canvas'
  ) as NodeListOf<HTMLCanvasElement>;

  for (const key in cells) {
    if (cells.hasOwnProperty(key)) {
      cells[key].removeEventListener('click', APP.eventListeners.onGridCellClick);
    }
  }
}

/**
 * Function fires at the click event on a panel object
 *
 * @param event
 */
function panelObjectClickHandler(event: MouseEvent) {
  const currentObject: HTMLElement = event.currentTarget as HTMLElement;

  for (const key in this.panelObjects) {
    if (this.panelObjects.hasOwnProperty(key)) {
      this.panelObjects[key].classList.remove('active');
    }
  }

  currentObject.classList.add('active');

  this.selectedObject = parseInt(currentObject.getAttribute('key'));
}

/**
 * Function fires at the click event on a panel action button
 *
 * @param event
 */
function panelActionClickHandler(event: MouseEvent) {
  event.stopPropagation();

  const action: HTMLElement = event.target as HTMLElement;
  const actionType: string = action.getAttribute('action');

  switch (actionType) {
    case 'reset': {
      if (confirm('Are you sure you want to reset current map?')) {
        const cells: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(
          '.editorBoard .-grid .-cell .-canvas'
        ) as NodeListOf<HTMLCanvasElement>;

        for (const key in cells) {
          if (cells.hasOwnProperty(key)) {
            clearCell.call(this, cells[key].getContext('2d'));
          }
        }

        this.resetMap();
      }
      break;
    }
    case 'generate': {
      new GeneratedMap(this);
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
function gridCellClickHandler(event: MouseEvent) {
  event.stopPropagation();

  const currentCanvas: HTMLCanvasElement = event.target as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = currentCanvas.getContext('2d');
  const cellX: number = parseInt(currentCanvas.getAttribute('x'));
  const cellY: number = parseInt(currentCanvas.getAttribute('y'));

  switch (this.selectedObject) {
    case 0: {
      return clearCell.call(this, ctx);
    }
    case 1: {
      this.currentMap[cellY][cellX] = this.selectedObject;

      return renderEmptySpace.call(this, ctx);
    }
    case 2: {
      this.currentMap[cellY][cellX] = this.selectedObject;

      return renderWall.call(this, ctx);
    }
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18: {
      return renderBlock.call(this, ctx, this.selectedObject - 10);
    }
    case 20: {
      return renderTarget.call(this, ctx);
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

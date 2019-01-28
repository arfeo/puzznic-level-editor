// tslint:disable:max-file-line-count
import { ELEMENTS_COLORS, ERASER_ICON, LABEL_FONT } from '../../constants/app';

import { drawLineToAngle, drawRectangle, drawTriangle } from '../../utils/drawing';

/**
 * Function renders the Editor board: grid, canvas, tools panel
 */
function renderEditorBoard() {
  const appRoot: HTMLElement = document.getElementById('root');
  const editorBoard: HTMLElement = document.createElement('div');
  const gridContainer: HTMLElement = document.createElement('div');

  this.editorBoardGrid = document.createElement('div');
  this.editorPanel = document.createElement('div');

  this.panelActions = {
    reset: document.createElement('div'),
    generate: document.createElement('div'),
  };

  appRoot.innerHTML = '';

  editorBoard.className = 'editorBoard';
  gridContainer.className = '-grid-container';
  this.editorBoardGrid.className = '-grid';
  this.editorPanel.className = '-panel';

  appRoot.appendChild(editorBoard);
  editorBoard.appendChild(gridContainer);
  gridContainer.appendChild(this.editorBoardGrid);
  editorBoard.appendChild(this.editorPanel);

  for (let y = 0; y < 12; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const cell: HTMLElement = document.createElement('div');
      const cellCanvas: HTMLCanvasElement = document.createElement('canvas');

      cell.className = '-cell';
      cellCanvas.id = `canvas-${y}-${x}`;
      cellCanvas.className = '-canvas';
      cellCanvas.width = this.cellSize;
      cellCanvas.height = this.cellSize;
      cellCanvas.setAttribute('x', x.toString());
      cellCanvas.setAttribute('y', y.toString());

      this.editorBoardGrid.appendChild(cell);
      cell.appendChild(cellCanvas);
    }
  }
}

/**
 * Function renders the Editor's panel objects and action buttons
 */
function renderPanel() {
  this.panelObjects = {
    empty: document.createElement('div'),
    wall: document.createElement('div'),
    block1: document.createElement('div'),
    block2: document.createElement('div'),
    block3: document.createElement('div'),
    block4: document.createElement('div'),
    block5: document.createElement('div'),
    block6: document.createElement('div'),
    block7: document.createElement('div'),
    block8: document.createElement('div'),
    target: document.createElement('div'),
    eraser: document.createElement('div'),
  };

  const panelObjectsBlockCanvas: { [key: string]: HTMLCanvasElement } = {
    block1: document.createElement('canvas'),
    block2: document.createElement('canvas'),
    block3: document.createElement('canvas'),
    block4: document.createElement('canvas'),
    block5: document.createElement('canvas'),
    block6: document.createElement('canvas'),
    block7: document.createElement('canvas'),
    block8: document.createElement('canvas'),
  };

  const panelObjects: HTMLElement = document.createElement('div');
  const panelObjectEmptyCanvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectWallCanvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectTargetCanvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectEraserCanvas: HTMLCanvasElement = document.createElement('canvas');
  const panelActions: HTMLElement = document.createElement('div');

  panelObjectEmptyCanvas.width = this.cellSize;
  panelObjectEmptyCanvas.height = this.cellSize;
  panelObjectWallCanvas.width = this.cellSize;
  panelObjectWallCanvas.height = this.cellSize;
  panelObjectTargetCanvas.width = this.cellSize;
  panelObjectTargetCanvas.height = this.cellSize;
  panelObjectEraserCanvas.width = this.cellSize;
  panelObjectEraserCanvas.height = this.cellSize;

  panelObjects.className = '-objects';
  panelActions.className = '-actions';
  this.panelObjects.empty.className = '-object';
  this.panelObjects.empty.setAttribute('key', '1');
  this.panelObjects.empty.title = 'Empty space';
  this.panelObjects.wall.className = '-object';
  this.panelObjects.wall.setAttribute('key', '2');
  this.panelObjects.wall.title = 'Wall';
  this.panelObjects.target.className = '-object';
  this.panelObjects.target.setAttribute('key', '20');
  this.panelObjects.target.title = 'Target';
  this.panelObjects.eraser.classList.add('-object');
  this.panelObjects.eraser.classList.add('eraser');
  this.panelObjects.eraser.title = 'Clear cell';
  this.panelObjects.eraser.setAttribute('key', '0');
  this.panelActions.reset.className = '-reset';
  this.panelActions.generate.className = '-generate';

  this.editorPanel.appendChild(panelObjects);
  this.panelObjects.empty.appendChild(panelObjectEmptyCanvas);
  this.panelObjects.wall.appendChild(panelObjectWallCanvas);
  this.panelObjects.target.appendChild(panelObjectTargetCanvas);
  this.panelObjects.eraser.appendChild(panelObjectEraserCanvas);
  panelObjects.appendChild(this.panelObjects.empty);
  panelObjects.appendChild(this.panelObjects.wall);

  for (let i = 1; i <= 8; i += 1) {
    const blockName = `block${i}`;

    panelObjectsBlockCanvas[blockName].width = this.cellSize;
    panelObjectsBlockCanvas[blockName].height = this.cellSize;

    this.panelObjects[blockName].className = '-object';
    this.panelObjects[blockName].setAttribute('key', `${i + 10}`);
    this.panelObjects[blockName].title = `Block type ${i}`;

    this.panelObjects[blockName].appendChild(panelObjectsBlockCanvas[blockName]);

    panelObjects.appendChild(this.panelObjects[blockName]);

    renderBlock.call(this, panelObjectsBlockCanvas[blockName].getContext('2d'), i);
  }

  panelObjects.appendChild(this.panelObjects.target);
  panelObjects.appendChild(this.panelObjects.eraser);
  this.editorPanel.appendChild(panelActions);
  panelActions.appendChild(this.panelActions.reset);
  panelActions.appendChild(this.panelActions.generate);
  this.panelActions.reset.innerText = 'Reset';
  this.panelActions.reset.setAttribute('action', 'reset');
  this.panelActions.generate.innerText = 'Generate';
  this.panelActions.generate.setAttribute('action', 'generate');

  renderEmptySpace.call(this, panelObjectEmptyCanvas.getContext('2d'));
  renderWall.call(this, panelObjectWallCanvas.getContext('2d'));
  renderTarget.call(this, panelObjectTargetCanvas.getContext('2d'));
  renderEraser.call(this, panelObjectEraserCanvas.getContext('2d'));
}

/**
 * Function renders an empty cell (`map` element)
 *
 * @param ctx
 */
function renderEmptySpace(ctx: CanvasRenderingContext2D) {
  drawRectangle(
    ctx,
    0,
    0,
    this.cellSize,
    this.cellSize,
    ELEMENTS_COLORS.empty.background,
  );
}

/**
 * Function renders a wall (`map` element)
 *
 * @param ctx
 */
function renderWall(ctx: CanvasRenderingContext2D) {
  drawRectangle(
    ctx,
    0,
    0,
    this.cellSize,
    this.cellSize,
    ELEMENTS_COLORS.wall.border,
  );
  drawTriangle(
    ctx,
    [this.cellSize / 12, this.cellSize / 12],
    [this.cellSize - this.cellSize / 6, this.cellSize / 12],
    [this.cellSize / 12, this.cellSize - this.cellSize / 6],
    ELEMENTS_COLORS.wall.background,
  );
  drawTriangle(
    ctx,
    [this.cellSize / 12, this.cellSize - this.cellSize / 6],
    [this.cellSize - this.cellSize / 6, this.cellSize / 12],
    [this.cellSize - this.cellSize / 6, this.cellSize - this.cellSize / 6],
    ELEMENTS_COLORS.wall.shadow,
  );
  drawLineToAngle(
    ctx,
    0,
    this.cellSize - this.cellSize / 24,
    this.cellSize,
    0,
    ELEMENTS_COLORS.wall.margin,
    this.cellSize / 12,
  );
  drawLineToAngle(
    ctx,
    this.cellSize - this.cellSize / 24,
    this.cellSize,
    this.cellSize,
    270,
    ELEMENTS_COLORS.wall.margin,
    this.cellSize / 12,
  );
}

/**
 * Function renders a block of a given type (`blocks` element)
 *
 * @param ctx
 * @param type
 */
function renderBlock(ctx: CanvasRenderingContext2D, type: number) {
  drawRectangle(
    ctx,
    0,
    0,
    this.cellSize,
    this.cellSize,
    ELEMENTS_COLORS.block.border,
  );
  drawRectangle(
    ctx,
    this.cellSize / 6,
    this.cellSize / 6,
    this.cellSize * 2 / 3,
    this.cellSize * 2 / 3,
    ELEMENTS_COLORS.block.background,
  );
  drawLineToAngle(
    ctx,
    this.cellSize * 3 / 24,
    this.cellSize / 6,
    this.cellSize * 2 / 3,
    90,
    ELEMENTS_COLORS.block.highlight,
    this.cellSize / 12,
  );
  drawLineToAngle(
    ctx,
    this.cellSize / 6,
    this.cellSize * 3 / 24,
    this.cellSize * 2 / 3,
    0,
    ELEMENTS_COLORS.block.highlight,
    this.cellSize / 12,
  );
  drawLineToAngle(
    ctx,
    this.cellSize / 6,
    this.cellSize * 21 / 24,
    this.cellSize * 2 / 3,
    0,
    ELEMENTS_COLORS.block.background,
    this.cellSize / 12,
  );
  drawLineToAngle(
    ctx,
    this.cellSize * 21 / 24,
    this.cellSize / 6,
    this.cellSize * 2 / 3,
    90,
    ELEMENTS_COLORS.block.background,
    this.cellSize / 12,
  );
  drawRectangle(
    ctx,
    0,
    0,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );
  drawRectangle(
    ctx,
    this.cellSize * 11 / 12,
    0,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );
  drawRectangle(
    ctx,
    this.cellSize * 11 / 12,
    this.cellSize * 11 / 12,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );
  drawRectangle(
    ctx,
    0,
    this.cellSize * 11 / 12,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );

  ctx.font = LABEL_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = ELEMENTS_COLORS.block.labelShadow;
  ctx.fillText(
    type.toString(),
    this.cellSize * 7 / 12,
    this.cellSize * 7 / 12,
  );

  ctx.fillStyle = ELEMENTS_COLORS.block.label;
  ctx.fillText(
    type.toString(),
    this.cellSize / 2,
    this.cellSize / 2,
  );
}

/**
 * Function renders the target -- a border with rectangle shape
 *
 * @param ctx
 */
function renderTarget(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(
    this.cellSize * 2,
    this.cellSize * 2,
    this.cellSize * 5,
    this.cellSize * 5,
  );

  drawRectangle(
    ctx,
    this.cellSize / 12,
    this.cellSize / 12,
    this.cellSize * 5 / 6,
    this.cellSize * 5 / 6,
    null,
    this.cellSize / 6,
    ELEMENTS_COLORS.target.border,
  );
  drawRectangle(
    ctx,
    0,
    0,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );
  drawRectangle(
    ctx,
    this.cellSize * 11 / 12,
    0,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );
  drawRectangle(
    ctx,
    this.cellSize * 11 / 12,
    this.cellSize * 11 / 12,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );
  drawRectangle(
    ctx,
    0,
    this.cellSize - this.cellSize / 12,
    this.cellSize / 12,
    this.cellSize / 12,
    ELEMENTS_COLORS.empty.background,
  );
}

/**
 * Function renders eraser tool icon
 *
 * @param ctx
 */
function renderEraser(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = ELEMENTS_COLORS.eraser.color;
  ctx.font = LABEL_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(
    ERASER_ICON,
    this.cellSize / 2,
    this.cellSize / 2,
  );
}

/**
 * Function clears a cell's canvas by the given rendering context
 *
 * @param ctx
 */
function clearCell(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(
    0,
    0,
    this.cellSize,
    this.cellSize,
  );
}

export {
  renderEditorBoard,
  renderPanel,
  renderEmptySpace,
  renderWall,
  renderBlock,
  renderTarget,
  clearCell,
};

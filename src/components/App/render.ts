// tslint:disable:max-file-line-count
import { ELEMENTS_COLORS, LABEL_FONT } from '../../constants/app';

import { drawLineToAngle, drawRectangle, drawTriangle } from '../../utils/drawing';

/**
 * Render the Editor board: grid, canvas, tools panel
 */
function renderEditorBoard() {
  const appRoot: HTMLElement = document.getElementById('root');
  const editorBoard: HTMLElement = document.createElement('div');
  const gridContainer: HTMLElement = document.createElement('div');

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
 * Render tools panel
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
    eraser: document.createElement('div'),
  };

  const panelObjects: HTMLElement = document.createElement('div');
  const panelObjectEmptyCanvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectWallCanvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock1Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock2Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock3Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock4Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock5Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock6Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock7Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectBlock8Canvas: HTMLCanvasElement = document.createElement('canvas');
  const panelObjectEraserCanvas: HTMLCanvasElement = document.createElement('canvas');
  const panelActions: HTMLElement = document.createElement('div');

  panelObjectEmptyCanvas.width = this.cellSize;
  panelObjectEmptyCanvas.height = this.cellSize;
  panelObjectWallCanvas.width = this.cellSize;
  panelObjectWallCanvas.height = this.cellSize;
  panelObjectBlock1Canvas.width = this.cellSize;
  panelObjectBlock1Canvas.height = this.cellSize;
  panelObjectBlock2Canvas.width = this.cellSize;
  panelObjectBlock2Canvas.height = this.cellSize;
  panelObjectBlock3Canvas.width = this.cellSize;
  panelObjectBlock3Canvas.height = this.cellSize;
  panelObjectBlock4Canvas.width = this.cellSize;
  panelObjectBlock4Canvas.height = this.cellSize;
  panelObjectBlock5Canvas.width = this.cellSize;
  panelObjectBlock5Canvas.height = this.cellSize;
  panelObjectBlock6Canvas.width = this.cellSize;
  panelObjectBlock6Canvas.height = this.cellSize;
  panelObjectBlock7Canvas.width = this.cellSize;
  panelObjectBlock7Canvas.height = this.cellSize;
  panelObjectBlock8Canvas.width = this.cellSize;
  panelObjectBlock8Canvas.height = this.cellSize;
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
  this.panelObjects.block1.className = '-object';
  this.panelObjects.block1.setAttribute('key', '11');
  this.panelObjects.block1.title = 'Block type 1';
  this.panelObjects.block2.className = '-object';
  this.panelObjects.block2.setAttribute('key', '12');
  this.panelObjects.block2.title = 'Block type 2';
  this.panelObjects.block3.className = '-object';
  this.panelObjects.block3.setAttribute('key', '13');
  this.panelObjects.block3.title = 'Block type 3';
  this.panelObjects.block4.className = '-object';
  this.panelObjects.block4.setAttribute('key', '14');
  this.panelObjects.block4.title = 'Block type 4';
  this.panelObjects.block5.className = '-object';
  this.panelObjects.block5.setAttribute('key', '15');
  this.panelObjects.block5.title = 'Block type 5';
  this.panelObjects.block6.className = '-object';
  this.panelObjects.block6.setAttribute('key', '16');
  this.panelObjects.block6.title = 'Block type 6';
  this.panelObjects.block7.className = '-object';
  this.panelObjects.block7.setAttribute('key', '17');
  this.panelObjects.block7.title = 'Block type 7';
  this.panelObjects.block8.className = '-object';
  this.panelObjects.block8.setAttribute('key', '18');
  this.panelObjects.block8.title = 'Block type 8';
  this.panelObjects.eraser.classList.add('-object');
  this.panelObjects.eraser.classList.add('eraser');
  this.panelObjects.eraser.title = 'Clear cell';
  this.panelObjects.eraser.setAttribute('key', '0');
  this.panelActions.reset.className = '-reset';
  this.panelActions.generate.className = '-generate';

  this.editorPanel.appendChild(panelObjects);
  this.panelObjects.empty.appendChild(panelObjectEmptyCanvas);
  this.panelObjects.wall.appendChild(panelObjectWallCanvas);
  this.panelObjects.block1.appendChild(panelObjectBlock1Canvas);
  this.panelObjects.block2.appendChild(panelObjectBlock2Canvas);
  this.panelObjects.block3.appendChild(panelObjectBlock3Canvas);
  this.panelObjects.block4.appendChild(panelObjectBlock4Canvas);
  this.panelObjects.block5.appendChild(panelObjectBlock5Canvas);
  this.panelObjects.block6.appendChild(panelObjectBlock6Canvas);
  this.panelObjects.block7.appendChild(panelObjectBlock7Canvas);
  this.panelObjects.block8.appendChild(panelObjectBlock8Canvas);
  this.panelObjects.eraser.appendChild(panelObjectEraserCanvas);
  panelObjects.appendChild(this.panelObjects.empty);
  panelObjects.appendChild(this.panelObjects.wall);
  panelObjects.appendChild(this.panelObjects.block1);
  panelObjects.appendChild(this.panelObjects.block2);
  panelObjects.appendChild(this.panelObjects.block3);
  panelObjects.appendChild(this.panelObjects.block4);
  panelObjects.appendChild(this.panelObjects.block5);
  panelObjects.appendChild(this.panelObjects.block6);
  panelObjects.appendChild(this.panelObjects.block7);
  panelObjects.appendChild(this.panelObjects.block8);
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
  renderBlock.call(this, panelObjectBlock1Canvas.getContext('2d'), 1);
  renderBlock.call(this, panelObjectBlock2Canvas.getContext('2d'), 2);
  renderBlock.call(this, panelObjectBlock3Canvas.getContext('2d'), 3);
  renderBlock.call(this, panelObjectBlock4Canvas.getContext('2d'), 4);
  renderBlock.call(this, panelObjectBlock5Canvas.getContext('2d'), 5);
  renderBlock.call(this, panelObjectBlock6Canvas.getContext('2d'), 6);
  renderBlock.call(this, panelObjectBlock7Canvas.getContext('2d'), 7);
  renderBlock.call(this, panelObjectBlock8Canvas.getContext('2d'), 8);
  renderEraser.call(this, panelObjectEraserCanvas.getContext('2d'));
}

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
 * Render eraser tool icon
 *
 * @param ctx
 */
function renderEraser(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = ELEMENTS_COLORS.eraser.color;
  ctx.font = LABEL_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(
    '⌫',
    this.cellSize / 2,
    this.cellSize / 2,
  );
}

/**
 * Clear cell canvas completely
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
  clearCell,
};

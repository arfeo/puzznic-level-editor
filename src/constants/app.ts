export enum LevelObjects {
  Nothing = 0,
  Empty = 1,
  Wall = 2,
  Block1 = 11,
  Block2 = 12,
  Block3 = 13,
  Block4 = 14,
  Block5 = 15,
  Block6 = 16,
  Block7 = 17,
  Block8 = 18,
  Target = 20,
}

export enum Actions {
  Reset = 'reset',
  Generate = 'generate',
}

export const ELEMENTS_COLORS: { [key: string]: { [key: string]: string } } = {
  empty: {
    background: 'rgb(255, 255, 255)',
  },
  wall: {
    border: 'rgb(96, 95, 96)',
    background: 'rgb(255, 255, 255)',
    shadow: 'rgb(190, 188, 191)',
    margin: 'rgb(0, 0, 0)',
  },
  block: {
    border: 'rgb(0, 0, 0)',
    background: 'rgb(96, 95, 96)',
    highlight: 'rgb(187, 186, 188)',
    label: 'rgb(255, 255, 255)',
    labelShadow: 'rgb(0, 0, 0)',
  },
  target: {
    border: 'rgb(190, 188, 191)',
  },
  eraser: {
    color: 'rgb(255, 0, 0)',
  },
};

export const CELL_SIZE_VMIN = 6;

export const ERASER_ICON = '⌫';

export const LABEL_FONT = '3vmin Courier';

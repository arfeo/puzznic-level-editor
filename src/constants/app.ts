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

export const ERASER_ICON = '⌫';

export const LABEL_FONT = '3vmin Courier';

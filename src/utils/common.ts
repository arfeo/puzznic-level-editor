import { APP } from '../constants/global';

export const calculateVMin = (): number => {
  const vpWidth: number = window.innerWidth;
  const vpHeight: number = window.innerHeight;

  return vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);
};

export const setCellSize = (): number => {
  return APP.cellSize > 0 ? APP.cellSize : (calculateVMin() * 6  / 10) * 10;
};

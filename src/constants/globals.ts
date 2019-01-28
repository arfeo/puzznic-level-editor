import { IGlobals } from '../types/constants';

export const globals: IGlobals = {
  pageInstance: null,
  eventListeners: {
    onGridCellClick: null,
    onPanelObjectClick: null,
    onPanelActionClick: null,
  },
  cellSize: null,
};

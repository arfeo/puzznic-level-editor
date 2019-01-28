import { App } from '../components/App';

export interface IGlobals {
  pageInstance: App;
  eventListeners: {
    onGridCellClick: EventListener;
    onPanelObjectClick: EventListener;
    onPanelActionClick: EventListener;
  };
  cellSize: number;
}

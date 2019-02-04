import { Editor } from '../components/Editor';

export interface IGlobals {
  pageInstance: Editor;
  eventListeners: { [key: string]: EventListener };
}

import { Editor } from '../../Editor';

import { setUpEventHandlers, removeEventHandlers } from '../../Editor/events';

abstract class Modal {
  editor: Editor;
  modalContainer: HTMLElement;
  mask: HTMLElement;
  modalWindow: HTMLElement;
  modalClose: HTMLElement;
  modal: HTMLElement;
  abstract render(): void;

  constructor(editor: Editor, size?: 'large' | 'medium' | 'small') {
    this.editor = editor;

    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'modal-container';

    this.mask = document.createElement('div');
    this.mask.className = 'mask';

    this.modalWindow = document.createElement('div');
    this.modalWindow.classList.add('modal-window');
    this.modalWindow.classList.add(size || 'medium');

    this.modalClose = document.createElement('div');
    this.modalClose.className = 'modal-close';

    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    document.body.appendChild(this.modalContainer);
    this.modalContainer.appendChild(this.mask);
    this.mask.appendChild(this.modalWindow);
    this.modalWindow.appendChild(this.modalClose);
    this.modalWindow.appendChild(this.modal);

    this.render();

    removeEventHandlers.call(this.editor);

    this.modalClose.addEventListener('click', this.close.bind(this));
  }

  close(): void {
    this.modalContainer.remove();

    setUpEventHandlers.call(this.editor);
  }
}

export { Modal };

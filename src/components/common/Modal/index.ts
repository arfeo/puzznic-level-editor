import { App } from '../../App';

import { setUpEventHandlers, removeEventHandlers } from '../../App/events';

type ModalSize = 'large' | 'medium' | 'small';

abstract class Modal {
  app: App;
  appRoot: HTMLElement;
  modalContainer: HTMLElement;
  mask: HTMLElement;
  modalWindow: HTMLElement;
  modalClose: HTMLElement;
  modal: HTMLElement;
  abstract render(): void;

  protected constructor(app: App, size?: ModalSize) {
    this.app = app;

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

    removeEventHandlers.call(this.app);

    this.modalClose.addEventListener('click', this.close.bind(this));
  }

  close() {
    this.modalContainer.remove();

    setUpEventHandlers.call(this.app);
  }
}

export { Modal };

import * as stringify from 'json-stringify-pretty-compact';

import { Modal } from '../common/Modal';

class GeneratedLevel extends Modal {
  levelTextArea: HTMLTextAreaElement;

  render(): void {
    const generatedMapContainer: HTMLElement = document.createElement('div');
    const paragraph: HTMLParagraphElement = document.createElement('p');
    const modalSubmit: HTMLElement = document.createElement('div');
    const copyToClipboardButton: HTMLButtonElement = document.createElement('button');

    this.levelTextArea = document.createElement('textarea');

    generatedMapContainer.innerHTML = '<strong>Generated level</strong>';
    this.levelTextArea.innerHTML = stringify(this.editor.level);
    this.levelTextArea.style.width = '100%';
    this.levelTextArea.style.height = '40vmin';
    modalSubmit.className = 'modal-submit';
    copyToClipboardButton.innerHTML = 'Copy to clipboard';
    copyToClipboardButton.className = '-button';

    this.modal.appendChild(generatedMapContainer);
    generatedMapContainer.appendChild(paragraph);
    generatedMapContainer.appendChild(modalSubmit);
    modalSubmit.appendChild(copyToClipboardButton);
    paragraph.appendChild(this.levelTextArea);

    copyToClipboardButton.addEventListener('click', () => {
      this.levelTextArea.select();
      document.execCommand('copy');
    });
  }
}

export { GeneratedLevel };

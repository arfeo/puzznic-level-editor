import { Modal } from '../common/Modal';
import { Editor } from '../Editor';

class GeneratedMap extends Modal {
  mapTextArea: HTMLTextAreaElement;

  constructor(editor: Editor) {
    super(editor);
  }

  render() {
    const generatedMapContainer: HTMLElement = document.createElement('div');
    const paragraph: HTMLParagraphElement = document.createElement('p');
    this.mapTextArea = document.createElement('textarea');
    const modalSubmit: HTMLElement = document.createElement('div');
    const copyToClipboardButton: HTMLButtonElement = document.createElement('button');

    generatedMapContainer.innerHTML = '<strong>Generated map</strong>';
    this.mapTextArea.innerHTML = JSON.stringify(this.editor.level.map);
    this.mapTextArea.style.width = '100%';
    this.mapTextArea.style.height = '40vmin';
    modalSubmit.className = 'modal-submit';
    copyToClipboardButton.innerHTML = 'Copy to clipboard';
    copyToClipboardButton.className = '-button';

    this.modal.appendChild(generatedMapContainer);
    generatedMapContainer.appendChild(paragraph);
    generatedMapContainer.appendChild(modalSubmit);
    modalSubmit.appendChild(copyToClipboardButton);
    paragraph.appendChild(this.mapTextArea);

    copyToClipboardButton.addEventListener('click', () => {
      this.mapTextArea.select();
      document.execCommand('copy');
    });
  }
}

export { GeneratedMap };

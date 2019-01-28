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
    const copyToClipboardButton: HTMLButtonElement = document.createElement('button');

    generatedMapContainer.innerHTML = '<strong>Generated map</strong>';
    this.mapTextArea.innerHTML = JSON.stringify(this.editor.currentMap);
    this.mapTextArea.style.width = '100%';
    this.mapTextArea.style.height = '40vmin';
    copyToClipboardButton.innerHTML = 'Copy to clipboard';

    this.modal.appendChild(generatedMapContainer);
    generatedMapContainer.appendChild(paragraph);
    generatedMapContainer.appendChild(copyToClipboardButton);
    paragraph.appendChild(this.mapTextArea);

    copyToClipboardButton.addEventListener('click', () => {
      this.mapTextArea.select();
      document.execCommand('copy');
    });
  }
}

export { GeneratedMap };

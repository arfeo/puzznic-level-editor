import { Modal } from '../common/Modal';
import { Editor } from '../Editor';

class GeneratedLevel extends Modal {
  levelTextArea: HTMLTextAreaElement;

  constructor(editor: Editor) {
    super(editor);
  }

  render() {
    const generatedMapContainer: HTMLElement = document.createElement('div');
    const paragraph: HTMLParagraphElement = document.createElement('p');
    this.levelTextArea = document.createElement('textarea');
    const modalSubmit: HTMLElement = document.createElement('div');
    const copyToClipboardButton: HTMLButtonElement = document.createElement('button');

    generatedMapContainer.innerHTML = '<strong>Generated level</strong>';
    this.levelTextArea.innerHTML = JSON.stringify(this.editor.level);
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

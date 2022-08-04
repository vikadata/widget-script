import { t } from "@vikadata/widget-sdk";
import { Strings } from "./i18n";

export class Input {
  private documentElem: Document;
  private container: Element;

  constructor(documentElem: Document) {
    this.documentElem = documentElem;
    this.container = this.documentElem.getElementById('root') || this.documentElem.body;
  }

  public async textAsync(name?: string) {
    return new Promise((resolve) => {
      const input = this.documentElem.createElement('input');
      const button = this.documentElem.createElement('button');
      const content = this.documentElem.createElement('div');
      input.className = 'inputPart';
      content.className = 'content';
      button.textContent = t(Strings.script_next_step);
      content.appendChild(input);
      content.appendChild(button);
      button.onclick = () => {
        content.removeChild(button);
        input.className = '';
        input.disabled = true;
        resolve(input.value);
      }

      if (name) {
        const title = this.documentElem.createElement('div');
        title.textContent = name;
        title.className = 'title';
        this.container.appendChild(title);
      }

      this.container.appendChild(content);
    })
  }
}
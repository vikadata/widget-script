import { marked } from 'marked';
import { Output } from './output.interface';

export class OutputClass implements Output {
  private documentElem: Document;
  private container: Element;

  constructor(documentElem: Document) {
    this.documentElem = documentElem;
    this.container = this.documentElem.getElementById('root') || this.documentElem.body;
  }

  public text(name: string) {
    const title = this.documentElem.createElement('div');
    title.textContent = name || '';
    title.className = 'title';
    this.container.appendChild(title);
  }

  public markdown(source: string) {
    const markdownContainer = this.documentElem.createElement('div');
    markdownContainer.innerHTML = marked.parse(source);
    this.container.appendChild(markdownContainer);
  }

  public clear() {
    let child = this.container.lastElementChild;  
    while (child) { 
      this.container.removeChild(child); 
      child = this.container.lastElementChild; 
    }
  }
}
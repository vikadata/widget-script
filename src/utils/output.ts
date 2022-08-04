export class Output {
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

  public clear() {
    let child = this.container.lastElementChild;  
    while (child) { 
      this.container.removeChild(child); 
      child = this.container.lastElementChild; 
    }
  }
}
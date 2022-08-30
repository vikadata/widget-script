import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Table } from './components';
import { Output } from './output.interface';
import { IContentWindow, RenderBase } from './render_base';

export class OutputClass extends RenderBase implements Output {
  constructor(window: IContentWindow) {
    super(window)
  }

  public text(name: string) {
    this.renderComponent(
      <div>{name}</div>
    );
  }

  public markdown(source: string) {
    this.renderComponent(
      <ReactMarkdown>
        {source}
      </ReactMarkdown>
    );
  }

  public table(data: (string | number | Object)[]) {
    const props = { data };
    this.renderComponent(
      <Table {...props as any} />
    );
  }

  public clear() {
    let child = this.container.lastElementChild;  
    while (child) { 
      this.container.removeChild(child); 
      child = this.container.lastElementChild; 
    }
  }
}
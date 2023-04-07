import React from 'react';
import { Output } from './output.interface';
import { Markdown, Table, Text } from './components';
import { IContentWindow, RenderBase } from './render_base';

export class OutputClass extends RenderBase implements Output {
  constructor(window: IContentWindow) {
    super(window)
  }

  public text(name: string) {
    this.renderComponent(
      <Text name={name} />
    );
  }

  public markdown(source: string) {
    const props = { source };
    this.renderComponent(
      <Markdown {...props as any} />
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
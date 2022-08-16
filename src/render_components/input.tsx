import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from './input.interface';
import { TextAsync, SelectAsync, RenderType } from './components';
import { Datasheet } from '@vikadata/widget-sdk/dist/script/datasheet';
import { Field } from '@vikadata/widget-sdk/dist/script/field';
import { View } from '@vikadata/widget-sdk/dist/script/view';

export interface IContentWindow extends Window {
  componentMap: Map<number, Function>;
}

export class InputClass implements Input {
  private id: number = 0;
  private window: IContentWindow;
  private document: Document;
  private container: Element;

  constructor(window: IContentWindow) {
    this.window = window;
    this.document = window.document;
    this.container = this.document.getElementById('root') || this.document.body;
  }

  private generateId() {
    return this.id ++;
  }

  public async viewAsync(name: string, datasheet: Datasheet) {
    return new Promise((resolve: (value: View) => void) => {
      const rootElement = this.document.createElement('div');
      ReactDOM.render((
        <SelectAsync 
          id={this.generateId()}
          name={name}
          nextFn={resolve}
          window={this.window}
          renderType={RenderType.View}
          datasheet={datasheet}
        />
      ), rootElement)
      this.container.appendChild(rootElement);
    })
  }

  public async fieldAsync(name: string, datasheet: Datasheet) {
    return new Promise((resolve: (value: Field) => void) => {
      const rootElement = this.document.createElement('div');
      ReactDOM.render((
        <SelectAsync 
          id={this.generateId()}
          name={name}
          nextFn={resolve}
          window={this.window}
          renderType={RenderType.Field}
          datasheet={datasheet}
        />
      ), rootElement)
      this.container.appendChild(rootElement);
    })
  }

  public async textAsync(name?: string) {
    return new Promise((resolve: (value: string) => void) => {
      const rootElement = this.document.createElement('div');
      ReactDOM.render((
        <TextAsync 
          id={this.generateId()}
          name={name}
          nextFn={resolve}
          window={this.window}
        />
      ), rootElement)
      this.container.appendChild(rootElement);
    })
  }
}
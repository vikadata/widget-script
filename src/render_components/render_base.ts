import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

export interface IContentWindow extends Window {
  componentMap: Map<string, Function>;
}

interface IReservedProps {
  id: string;
  window: IContentWindow;
}

export class RenderBase {
  private id: number = 0;
  private window: IContentWindow;
  private document: Document;
  protected container: Element;

  constructor(window: IContentWindow) {
    this.window = window;
    this.document = window.document;
    this.container = this.document.getElementById('root') || this.document.body;
  }

  private generateId() {
    const id = this.id ++;
    return `${Date.now()}_${id}`;
  }

  protected renderComponent<T>(component: ReactElement<IReservedProps>, props?: T) {
    const rootElement = this.document.createElement('div');
    ReactDOM.render((
      React.cloneElement(component, {
        id: this.generateId(),
        window: this.window,
        ...props
      })
    ), rootElement);
    this.container.appendChild(rootElement);
  }

  protected renderAsyncComponent(component: ReactElement) {
    return new Promise((resolve) => {
      this.renderComponent(component, { 
        nextFn: resolve,
      });
    })
  }
}
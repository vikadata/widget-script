import React from 'react';
import { View } from '@vikadata/widget-sdk/dist/script/view';
import { Field } from '@vikadata/widget-sdk/dist/script/field';
import { Record } from '@vikadata/widget-sdk/dist/script/record';
import { Datasheet } from '@vikadata/widget-sdk/dist/script/datasheet';
import { Input } from './input.interface';
import { IContentWindow, RenderBase } from './render_base';
import { TextAsync, SelectAsync, RenderType, RecordAsync } from './components';

export class InputClass extends RenderBase implements Input {
  private triggerFn: (datasheet: Datasheet) => string;

  constructor(window: IContentWindow, triggerFn: (datasheet: Datasheet) => string) {
    super(window);
    this.triggerFn = triggerFn;
  }

  public async viewAsync(name: string, datasheet: Datasheet) {
    const props = {
      name,
      datasheet,
      renderType: RenderType.View
    };
    return new Promise((resolve: (value: View) => void) => {
      this.renderComponent(
        <SelectAsync 
          {...props as any} 
          nextFn={resolve}
        />
      );
    });
  }

  public async fieldAsync(name: string, datasheet: Datasheet) {
    const props = {
      name,
      datasheet,
      renderType: RenderType.Field
    };
    return new Promise((resolve: (value: Field) => void) => {
      this.renderComponent(
        <SelectAsync 
          {...props as any} 
          nextFn={resolve}
        />
      );
    });
  }

  public async recordAsync(name: string, datasheet: Datasheet) {
    const props = {
      name,
      datasheet,
      triggerFn: this.triggerFn
    };
    return new Promise((resolve: (value: Record) => void) => {
      this.renderComponent(
        <RecordAsync 
          {...props as any} 
          nextFn={resolve}
        />
      );
    });
  }

  public async textAsync(name?: string) {
    const props = { name };
    return new Promise((resolve: (value: string) => void) => {
      this.renderComponent(
        <TextAsync 
          {...props as any} 
          nextFn={resolve}
        />
      );
    });
  }
}
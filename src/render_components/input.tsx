import React from 'react';
import { View } from '@apitable/widget-sdk/dist/script/view';
import { Field } from '@apitable/widget-sdk/dist/script/field';
import { Record } from '@apitable/widget-sdk/dist/script/record';
import { Datasheet } from '@apitable/widget-sdk/dist/script/datasheet';
import { Input } from './input.interface';
import { IContentWindow, RenderBase } from './render_base';
import { TextAsync, SelectAsync, RenderType, RecordAsync } from './components';

type TriggerFn = (datasheet: Datasheet) => Promise<string>;

export class InputClass extends RenderBase implements Input {
  private triggerFn: TriggerFn;

  constructor(window: IContentWindow, triggerFn: TriggerFn) {
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
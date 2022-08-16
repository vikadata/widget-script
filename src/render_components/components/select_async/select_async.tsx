import React, { FC, useMemo, useState } from 'react';
import { useMount } from 'ahooks';
import { t } from '@vikadata/widget-sdk';
import { useTheme } from '@vikadata/components';
import { StyleSheetManager } from 'styled-components';
import { Datasheet } from '@vikadata/widget-sdk/dist/script/datasheet';
import { Strings } from '../../i18n';
import {
  Label,
  Content,
  Button
} from '../text_async/styled';
import { IContentWindow } from '../../input';
import { Select } from '../select';
import { Field } from '@vikadata/widget-sdk/dist/script/field';
import { View } from '@vikadata/widget-sdk/dist/script/view';

export enum RenderType {
  Field = 'Field',
  View = 'View'
}

interface ISelectAsyncBase<T, K> {
  id: number;
  name?: string;
  nextFn: (value: K) => void;
  window: IContentWindow;
  renderType: T;
  datasheet: Datasheet
}

type SelectAsyncProps<T = RenderType> = (
  T extends RenderType.Field ? ISelectAsyncBase<T, Field> : ISelectAsyncBase<T, View>
);

export const SelectAsync: FC<SelectAsyncProps> = (props) => {
  const { id, name, nextFn, window, renderType, datasheet } = props;
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { color } = useTheme() as any;

  useMount(() => {
    window.componentMap.set(id, () => setDisabled(true));
  });

  const onClick = () => {
    setDisabled(true)
    const resData = renderType === RenderType.View ? datasheet.getView(value) : datasheet.getField(value);
    nextFn(resData as any);
  }

  const onSelected = (option) => {
    setValue(option.value);
  }

  const options = useMemo(() => {
    const { fields, views } = datasheet;
    const sourceData = (renderType === RenderType.Field ? fields : views) || [];
    const result = sourceData.map(({ id, name }) => ({
      label: name,
      value: id
    }));

    return result;
  }, [renderType, datasheet])

  return (
    <StyleSheetManager 
      target={window.document.head}
    >
      <div>
        {
          name &&
          <Label color={color.textCommonTertiary}>
            {name}
          </Label>
        }
        <Content>
          <Select
            value={value}
            options={options}
            disabled={disabled}
            triggerStyle={{ 
              width: disabled ? '100%' : 'calc(100% - 100px)' 
            }}
            onSelected={onSelected}
          />
          {
            !disabled &&
            <Button 
              onClick={onClick}
            >
              {t(Strings.script_next_step)}
            </Button>
          }
        </Content>
      </div>
    </StyleSheetManager>
  );
};
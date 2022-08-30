import React, { FC, useState } from 'react';
import { useMount } from 'ahooks';
import { t } from '@vikadata/widget-sdk';
import { useTheme } from '@vikadata/components';
import { StyleSheetManager } from 'styled-components';
import { Strings } from '../../i18n';
import {
  Label,
  Content,
  Input,
  Button
} from './styled';
import { IContentWindow } from '../../render_base';

interface ITextAsyncProps {
  id: string;
  name?: string;
  nextFn: (value: string) => void;
  window: IContentWindow;
}

export const TextAsync: FC<ITextAsyncProps> = (props) => {
  const { id, name, nextFn, window } = props;
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { color } = useTheme() as any;

  useMount(() => {
    window.componentMap.set(id, () => setDisabled(true));
  });

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onClick = () => {
    setDisabled(true)
    nextFn(value);
  }

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
          <Input 
            disabled={disabled}
            onChange={onChange} 
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
import React, { FC, useState } from 'react';
import { useMount } from 'ahooks';
import { t } from '@vikadata/widget-sdk';
import { useTheme } from '@vikadata/components';
import { ColumnLinktableFilled } from '@vikadata/icons';
import { StyleSheetManager } from 'styled-components';
import { Record } from '@vikadata/widget-sdk/dist/script/record';
import { Datasheet } from '@vikadata/widget-sdk/dist/script/datasheet';
import { IContentWindow } from '../../render_base';
import { TComponent } from '../t_component';
import { Strings } from '../../i18n';
import { Button } from '../button';
import {
  Label,
  Content
} from '../text_async/styled';

interface IRecordAsyncProps {
  id: string;
  name?: string;
  nextFn: (value: Record) => void;
  triggerFn: (datasheet: Datasheet) => string;
  window: IContentWindow;
  datasheet: Datasheet
}

export const RecordAsync: FC<IRecordAsyncProps> = (props) => {
  const { id, name, window, datasheet, triggerFn, nextFn } = props;
  const [disabled, setDisabled] = useState(false);
  const { color } = useTheme() as any;
  const [title, setTitle] = useState<null | string>(null);

  useMount(() => {
    window.componentMap.set(id, () => setDisabled(true));
  });

  const onClick = async () => {
    setDisabled(true);
    const recordId = await triggerFn(datasheet);
    const record = await datasheet.getRecordAsync(recordId);
    setTitle(record.title)
    nextFn(record);
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
          <Button 
            onClick={onClick}
            disabled={disabled}
            prefixIcon={title ? <ColumnLinktableFilled currentColor /> : <></>}
          >
            {
              title ||
              <TComponent
                tkey={t(Strings.script_select_record_by_sheet)}
                params={{
                  datasheetName: datasheet.name
                }}
              />
            }
            
          </Button>
        </Content>
      </div>
    </StyleSheetManager>
  );
};
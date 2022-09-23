import { isObject } from 'lodash';
import React, { FC, useMemo } from 'react';
import { BaseTable } from 'ali-react-table';
import { StyleSheetManager } from 'styled-components';
import { IContentWindow } from '../../render_base';
import { Strings } from '../../../utils';
import { t } from '@vikadata/widget-sdk';

interface ITableProps {
  data: (string | number | Object)[];
  window: IContentWindow
}

const DEFAULT_NAME = 'defaultName';
const DEFAULT_INDEX = t(Strings.script_serial_number);

export const Table: FC<ITableProps> = (props) => {
  const { data: _data, window } = props;
  const firstItem = _data[0];
  const isItemObject = isObject(firstItem);

  const columns = useMemo(() => {
    if (!isItemObject) {
      return [DEFAULT_INDEX, DEFAULT_NAME].map(name => ({
        code: name,
        name,
      }));
    }
    return [DEFAULT_INDEX, ...Object.keys(firstItem)].map(name => ({
      code: name,
      name,
    }));
  }, []);

  const data = useMemo(() => {
    return _data.map((item, index) => {
      if (!isItemObject) {
        return {
          [DEFAULT_INDEX]: index + 1,
          [DEFAULT_NAME]: item
        };
      }
      return {
        ...item as Object,
        [DEFAULT_INDEX]: index + 1,
      };
    })
  }, [_data, isItemObject]); 

  return (
    <StyleSheetManager 
      target={window.document.head}
    >
      <BaseTable 
        dataSource={data}
        columns={columns}
        hasHeader={isItemObject}
      />
    </StyleSheetManager>
  );
}
import React from 'react';
import classNames from 'classnames';
import { IOption, ISelectProps } from '@apitable/components';
import { Typography } from '../typography';

type IRenderValue = Pick<ISelectProps, 'renderValue'>;

export const SelectItem: React.FC<{ item: IOption; isChecked?: boolean } & Required<IRenderValue>> = (props) => {
  const { item, children, renderValue, isChecked } = props;

  const getEllipsisConfig = () => {
    if (!item.disabled) {
      return { tooltip: '' };
    }
    if (item.disabled && item.disabledTip) {
      return { tooltip: item.disabledTip };
    }

    if (children) {
      return { rows: 1, tooltip: item.label };
    }

    return true;
  };

  return <>
    <span
      className={classNames({
        isChecked: isChecked
      }, 'prefixIcon')}
    >
      {
        item.prefixIcon
      }
    </span>
    <Typography
      variant={'body1'}
      ellipsis={getEllipsisConfig()}
      className={classNames({
        isChecked: isChecked
      }, 'optionLabel')}
      component={'span'}
    >
      {
        children || renderValue(item)
      }
    </Typography>

    <span className={'suffixIcon'}>
      {
        item.suffixIcon
      }
    </span>
  </>;
};

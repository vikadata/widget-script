import React, { FC, useRef } from 'react';
import { IEllipsis, ITypographyProps } from '@vikadata/components';
import { TypographyBase } from './styled';
import classNames from 'classnames';

const defaultVariantMapping: { [key: string]: string } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h7: 'h6',
  h8: 'h6',
  h9: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  body4: 'p',
};
export const Typography: FC<ITypographyProps> = (props) => {
  const {
    className,
    component,
    align = 'inherit',
    variant = 'body1',
    color = '',
    children,
    ellipsis = false,
    tooltipsZIndex,
    ...rest
  } = props;
  const typographyRef = useRef<HTMLDivElement>();
  // 是否显示tooltip（用于一行）
  const more = { align, variant, color, ...rest };
  const tag = component || defaultVariantMapping[variant] || 'span';

  const getEllipsis = (ellipsis: IEllipsis | boolean): IEllipsis => {
    if (!ellipsis) {
      return {};
    }

    return {
      rows: 1,
      ...(typeof ellipsis === 'object' ? ellipsis : null)
    };
  };

  const { rows } = getEllipsis(ellipsis);
  const cssTextOverflow = rows === 1;
  const cssLineClamp = rows && rows > 1;

  return (
    <TypographyBase 
      className={classNames('typography', className)} 
      ref={typographyRef} 
      as={tag} 
      rows={rows} 
      children={children}
      cssTextOverflow={cssTextOverflow} 
      cssLineClamp={cssLineClamp} 
      {...more} 
    />
  );
};


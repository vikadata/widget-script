import React from 'react';
import { IButtonProps, getCurrentColorIcon } from '@apitable/components';
import { ButtonBase, IconSpanStyled, TextSpanStyled } from './styled';

export const Button = React.forwardRef(({
  children,
  size = 'middle',
  variant = 'fill',
  suffixIcon,
  prefixIcon,
  color = 'default',
  disabled,
  block,
  htmlType = 'button',
  ...restProps
}: IButtonProps, ref: React.Ref<HTMLButtonElement>) => {

  const PrefixIcon = getCurrentColorIcon(prefixIcon);
  const SuffixIcon = getCurrentColorIcon(suffixIcon);
  return (
    <ButtonBase
      ref={ref}
      size={size}
      btnColor={color}
      variant={variant}
      disabled={disabled}
      block={block}
      type={htmlType}
      {...restProps}
    >
      {prefixIcon && (
        <IconSpanStyled existIcon={Boolean(prefixIcon)} position='prefix'>
          {PrefixIcon}
        </IconSpanStyled>
      )}
      <TextSpanStyled>
        {children}
      </TextSpanStyled>
      {suffixIcon && (
        <IconSpanStyled existIcon={Boolean(suffixIcon)} position='suffix'>
          {SuffixIcon}
        </IconSpanStyled>
      )}
    </ButtonBase>
  );
});

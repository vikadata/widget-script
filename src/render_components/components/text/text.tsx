import React, { FC } from 'react';
import { useTheme } from '@apitable/components';
import { StyleSheetManager } from 'styled-components';

interface ITextProps {
  name: string;
}

export const Text: FC<ITextProps> = (props) => {
  const { name } = props;
  const { color } = useTheme();

  return (
    <StyleSheetManager 
      target={window.document.head}
    >
      <div style={{ color: color.textStaticPrimary }}>
        {name}
      </div>
    </StyleSheetManager>
  );
}
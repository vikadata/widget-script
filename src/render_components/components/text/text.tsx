import React, { FC } from 'react';
import { StyleSheetManager } from 'styled-components';
import { TextContainer } from './styled';
import { IContentWindow } from '../../render_base';

interface ITextProps {
  name: string;
  window: IContentWindow;
}

export const Text: FC<ITextProps> = (props) => {
  const { name, window } = props;

  return (
    <StyleSheetManager 
      target={window.document.head}
    >
      <TextContainer>
        {name}
      </TextContainer>
    </StyleSheetManager>
  );
}
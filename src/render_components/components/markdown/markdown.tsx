import React, { FC } from 'react';
import { StyleSheetManager } from 'styled-components';
import { MarkdownStyled } from './styled';
import { IContentWindow } from '../../render_base';

interface IMarkdownProps {
  source: string;
  window: IContentWindow;
}

export const Markdown: FC<IMarkdownProps> = (props) => {
  const { source, window } = props;

  const LinkRenderer = (props) => {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

  return (
    <StyleSheetManager 
      target={window.document.head}
    >
      <MarkdownStyled 
        components={{ a: LinkRenderer }}
      >
        {source}
      </MarkdownStyled>
    </StyleSheetManager>
  );
};
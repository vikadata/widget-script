import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface IMarkdownProps {
  source: string;
}

export const Markdown: FC<IMarkdownProps> = (props) => {
  const { source } = props;

  const LinkRenderer = (props) => {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

  return (
    <ReactMarkdown components={{ a: LinkRenderer }}>
      {source}
    </ReactMarkdown>
  );
};
import styled, { css } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { applyDefaultTheme } from '../utils';

export const MarkdownStyled = styled(ReactMarkdown).attrs(applyDefaultTheme)`
  ${props => {
    const { textCommonPrimary } = props.theme.color;

    return css`
      color: ${textCommonPrimary};
    `;
  }}
`;
import styled, { css } from 'styled-components';
import { fontVariants, ITypographyProps } from '@apitable/components';
import { applyDefaultTheme } from '../utils';

export const TypographyBase = styled.div.attrs(applyDefaultTheme) <Required<ITypographyProps> & {
  cssTextOverflow: boolean, cssLineClamp: boolean, rows: number 
}>`
  margin: 0;
  padding: 0;
  word-break: break-word;
  ${props => fontVariants[props.variant]}
  ${props => {
    return css`
      color: ${props.color || props.theme.color.fc1};
      text-align: ${props.align};
    `;
  }}

  ${props => props.cssTextOverflow && css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  ${props => props.cssLineClamp && css`
    display: -webkit-box;
    -webkit-line-clamp: ${props.rows};
    -webkit-box-orient: vertical;
    overflow-wrap: break-word;
    overflow: hidden;
  `}
`;

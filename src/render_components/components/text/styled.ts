import styled, { css } from 'styled-components';
import { applyDefaultTheme } from '../utils';

export const TextContainer = styled.div.attrs(applyDefaultTheme)`
  ${props => {
    const { textCommonPrimary } = props.theme.color;

    return css`
      color: ${textCommonPrimary};
    `;
  }}
`;
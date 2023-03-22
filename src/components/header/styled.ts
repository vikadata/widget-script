import { Button } from '@apitable/components';
import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bgCommonDefault);
  border-top: 1px solid var(--borderCommonDefault);
  border-bottom: 1px solid var(--borderCommonDefault);
`;

export const ToggleButton = styled(Button)`
  background-color: var(--bgControlsDefault);
`;
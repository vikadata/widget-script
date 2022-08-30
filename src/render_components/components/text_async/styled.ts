import styled from 'styled-components';
import { InputComponent } from '../input';
import { Button as ButtonComponent } from '../button';

export const Label = styled.div`
  margin-bottom: 4px;
  color: ${props => props.color};
`;

export const Content = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Input = styled(InputComponent)`
  width: ${props => {
    return props.disabled ? '100%' : 'calc(100% - 100px)';
  }};
`;

export const Button = styled(ButtonComponent)`
  margin-left: 8px;
  width: 92px;
`;
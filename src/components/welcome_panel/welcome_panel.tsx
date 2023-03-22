import React from 'react';
import { t } from '@apitable/widget-sdk';
import { Button } from '@apitable/components';
import { Strings } from '../../utils';
import { bundler } from '../../bundler';
import { generateInputCode } from '../header';
import { 
  useDispatch, 
  updateBundledCode, 
  updateRunningState, 
  updateInitializeState 
} from '../../store';
import { Container } from './styled';

export const WelcomePanel = ({ code }) => {
  const dispatch = useDispatch();

  const onClick = async () => {
    const input = generateInputCode(code);
		const output = await bundler(input);
    dispatch(updateRunningState(true));
    dispatch(updateInitializeState(false));
    dispatch(updateBundledCode(output));
  };

  return (
    <Container>
      <Button 
        size='middle' 
        onClick={onClick}
        color={'primary'}
      >
        {t(Strings.script_run)}
      </Button>
    </Container>
  );
};
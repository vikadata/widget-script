import React from 'react';
import { t } from '@vikadata/widget-sdk';
import { Button } from '@vikadata/components';
import { Strings } from '../../render_components';
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
import React from 'react';
import { t } from '@vikadata/widget-sdk';
import { Button } from '@vikadata/components';
import { Strings } from '../../utils';
import { generateInputCode } from '../header';
import { useDispatch, updateBundledCode, updateRunningState, updateInitializeState } from '../../store';
import { bundler } from '../../bundler';
import styles from './style.css';

export const Welcome = ({ code }) => {
  const dispatch = useDispatch();

  const onClick = async () => {
    const input = generateInputCode(code);
		const output = await bundler(input);
    dispatch(updateRunningState(true));
    dispatch(updateInitializeState(false));
    dispatch(updateBundledCode(output));
  };

  return (
    <div className={styles.welcomeContainer}>
      <Button 
        size='middle' 
        onClick={onClick}
        color={'primary'}
      >
        {t(Strings.script_run)}
      </Button>
    </div>
  );
};
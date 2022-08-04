import React, { FC } from 'react';
import { CollapseOutlined, ExpandOutlined } from '@vikadata/icons'
import { Button } from '@vikadata/components';
import { t, useViewport } from '@vikadata/widget-sdk';
import { useDispatch, updateBundledCode, toggleEditorPane, updateRunningState } from '../../store';
import { bundler } from '../../bundler';
import { Strings } from '../../utils';
import styles from './style.css';
import classNames from 'classnames';

interface IHeaderProps {
  code: string;
  isRunning: boolean;
  isInitialize: boolean;
  isEditorPaneOpen: boolean;
}

export const generateInputCode = (code: string) => {
  const PREFIX_CODE = `import _ from 'lodash';\n`;

  return PREFIX_CODE + `(async function() {
    ${code}
    globalStop();
  })()`;
}

export const Header: FC<IHeaderProps> = ({ 
  code, 
  isRunning,
  isInitialize,
  isEditorPaneOpen 
}) => {
  const dispatch = useDispatch();
  const { isFullscreen, toggleFullscreen } = useViewport();

  const toggleEditorStatus = () => {
    if (!isFullscreen && !isEditorPaneOpen) {
      toggleFullscreen(true);
    }
    dispatch(toggleEditorPane());
  };

  const toggleRunningState = async () => {
    const input = generateInputCode(code);
		const output = await bundler(input);
    dispatch(updateRunningState(!isRunning));
    dispatch(updateBundledCode(output));
  };

  return (
    <header className={styles.header}>
      <Button 
        size='small' 
        className={classNames(styles.headerBtn, styles.toggleEditorBtn)} 
        onClick={toggleEditorStatus}
        prefixIcon={isEditorPaneOpen ? <CollapseOutlined /> : <ExpandOutlined />}
      >
        {isEditorPaneOpen ? t(Strings.script_finish_editing) : t(Strings.script_edit_code)}
      </Button>
      {
        !isInitialize &&
        <Button 
          size='small' 
          className={classNames(styles.headerBtn, styles.runBtn)}
          onClick={toggleRunningState}
          color={isRunning ? 'danger' :  'primary'}
        >
          {isRunning ? t(Strings.script_stop) : t(Strings.script_run)}
        </Button>
      }
    </header>
  )
}
import React, { FC } from 'react';
import { Button } from '@apitable/components';
import { t, useViewport } from '@apitable/widget-sdk';
import { CollapseOutlined, ExpandOutlined } from '@apitable/icons'
import { useDispatch, updateBundledCode, toggleEditorPane, updateRunningState } from '../../store';
import { bundler } from '../../bundler';
import { Strings } from '../../utils';
import { Container, ToggleButton } from './styled';

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
    <Container>
      <ToggleButton 
        size='small' 
        onClick={toggleEditorStatus}
        prefixIcon={isEditorPaneOpen ? <CollapseOutlined /> : <ExpandOutlined />}
      >
        {isEditorPaneOpen ? t(Strings.script_finish_editing) : t(Strings.script_edit_code)}
      </ToggleButton>
      {
        !isInitialize &&
        <Button 
          size='small' 
          onClick={toggleRunningState}
          color={isRunning ? 'danger' : 'primary'}
        >
          {isRunning ? t(Strings.script_stop) : t(Strings.script_run)}
        </Button>
      }
    </Container>
  )
}
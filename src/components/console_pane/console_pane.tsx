import React, { memo } from "react";
import { Console } from 'console-feed';
import { ChevronDownOutlined, ChevronUpOutlined, ClearOutlined } from '@vikadata/icons';
import { clearLogs, editorState, toggleConsolePane, useDispatch, useSelector } from "../../store";
import { useTheme } from "@vikadata/components";
import { Strings } from "../../utils";
import { t } from "@vikadata/widget-sdk";
import './style.css';

export const ConsolePane = memo(() => {
  const { 
    logs, 
    isConsolePaneOpen 
  } = useSelector(editorState);
  const dispatch = useDispatch();
  const { color } = useTheme() as any;

  const IconComponent = isConsolePaneOpen ? ChevronDownOutlined : ChevronUpOutlined;

  const onClick = () => {
    dispatch(toggleConsolePane());
  }

  return (
    <div className="consolePane">
      <div className="consolePaneHeader">
        <div className="consolePaneTitle">
          {t(Strings.script_console)}
        </div>
        <div className="consolePaneRight">
          <ClearOutlined 
            color={color.textCommonTertiary} 
            className='clearBtn'
            onClick={() => dispatch(clearLogs())}
          />
          <IconComponent 
            color={color.textCommonTertiary} 
            className='toggleBtn'
            onClick={onClick}
          />
        </div>
      </div>

      <div className="consolePaneContent">
        <Console
          styles={{
            BASE_FONT_SIZE: 14,
            BASE_FONT_FAMILY: 'Cousine',
            TREENODE_FONT_FAMILY: 'Cousine',
            BASE_BACKGROUND_COLOR: 'transparent',
            LOG_BACKGROUND: 'transparent',
            LOG_COLOR: color.textCommonPrimary,
            LOG_WARN_BACKGROUND: color.bgWarnLightDefault,
            LOG_ERROR_BACKGROUND: color.bgDangerLightDefault,
            LOG_BORDER: color.borderCommon,
            LOG_WARN_BORDER: color.borderCommon,
            LOG_ERROR_BORDER: color.borderCommon,
            LOG_ICON_HEIGHT: 22,
          }}
          logs={logs as any}
          variant="light"
        />
      </div>
    </div>
  );
});

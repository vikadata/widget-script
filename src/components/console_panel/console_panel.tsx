import React, { memo } from "react";
import { Console } from 'console-feed';
import { useTheme } from "@vikadata/components";
import { t, useMeta } from "@vikadata/widget-sdk";
import { ChevronDownOutlined, ChevronUpOutlined, ClearOutlined } from '@vikadata/icons';
import { clearLogs, editorState, toggleConsolePane, useDispatch, useSelector } from "../../store";
import { Strings } from "../../utils";
import { 
  Container,
  Header,
  Title,
  HeaderRight,
  IconWrapper,
  Content
} from './styled';

export const ConsolePanel = memo(() => {
  const { 
    logs, 
    isConsolePaneOpen 
  } = useSelector(editorState);
  const meta = useMeta();
  const themeName = meta.theme;
  const dispatch = useDispatch();
  const { color } = useTheme() as any;

  const IconComponent = isConsolePaneOpen ? ChevronDownOutlined : ChevronUpOutlined;

  const onClick = () => {
    dispatch(toggleConsolePane());
  }

  const onClear = (e) => {
    e.stopPropagation()
    dispatch(clearLogs());
  }

  return (
    <Container>
      <Header onClick={onClick}>
        <Title>
          {t(Strings.script_console)}
        </Title>
        <HeaderRight>
          <IconWrapper onClick={onClear}>
            <ClearOutlined 
              color={color.textCommonTertiary} 
            />
          </IconWrapper>
          <IconWrapper>
            <IconComponent 
              color={color.textCommonTertiary} 
            />
          </IconWrapper>
        </HeaderRight>
      </Header>

      <Content>
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
          logs={logs}
          variant={themeName}
        />
      </Content>
    </Container>
  );
});

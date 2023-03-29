import React, { useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { t } from '@apitable/widget-sdk';
import { getThemeName, useTheme } from '@apitable/components';
import { ChevronDownOutlined, ChevronUpOutlined, ColumnLinktableFilled } from '@apitable/icons';
import { editorState, toggleDocumentPane, useDispatch, useSelector } from '../../store';
import Settings from '../../../settings.json';
import { Strings } from '../../utils';
import { 
  Container,
  Iframe
} from './styled';
import { 
  Header,
  Title,
  HeaderRight,
  IconWrapper,
  Content,
} from '../console_panel/styled';

export const DocumentPanel = () => {
  const { isDocumentPaneOpen } = useSelector(editorState, shallowEqual);
  const dispatch = useDispatch();
  const { color } = useTheme();
  const iframeRef = useRef<any>();

  const IconComponent = isDocumentPaneOpen ? ChevronDownOutlined : ChevronUpOutlined;

  const onClick = () => {
    dispatch(toggleDocumentPane());
  }

  const onOpen = (e) => {
    e.stopPropagation()
    window.open(Settings.help_document_url, '_blank')
  }

  return (
    <Container>
      <Header onClick={onClick}>
        <Title>
          {t(Strings.script_document)}
        </Title>
        <HeaderRight>
          <IconWrapper onClick={onOpen}>
            <ColumnLinktableFilled 
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
        <Iframe
          ref={iframeRef}
          title="users-html"
          src={`${Settings.help_document_url}?theme=${getThemeName()}`}
          sandbox="allow-same-origin allow-scripts"
          frameBorder={'none'}
        />
      </Content>
    </Container>
  )
}
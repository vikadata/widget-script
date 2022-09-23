import React, { useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { t } from '@vikadata/widget-sdk';
import { useTheme } from '@vikadata/components';
import { ChevronDownOutlined, ChevronUpOutlined, ColumnLinktableFilled } from '@vikadata/icons';
import { editorState, toggleDocumentPane, useDispatch, useSelector } from '../../store';
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

const DOCUMENT_URL = 'https://docs-script-document.developers-6w5.pages.dev/script/introduction/';

export const DocumentPanel = () => {
  const { isDocumentPaneOpen } = useSelector(editorState, shallowEqual);
  const dispatch = useDispatch();
  const { color } = useTheme() as any;
  const iframeRef = useRef<any>();

  const IconComponent = isDocumentPaneOpen ? ChevronDownOutlined : ChevronUpOutlined;

  const onClick = () => {
    dispatch(toggleDocumentPane());
  }

  const onOpen = (e) => {
    e.stopPropagation()
    window.open(DOCUMENT_URL, '_blank')
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
          src={DOCUMENT_URL}
          sandbox="allow-same-origin allow-scripts"
          frameBorder={'none'}
        />
      </Content>
    </Container>
  )
}
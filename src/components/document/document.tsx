import React, { useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { t } from '@vikadata/widget-sdk';
import { useTheme } from '@vikadata/components';
import { ChevronDownOutlined, ChevronUpOutlined, ColumnLinktableFilled } from '@vikadata/icons';
import { editorState, toggleDocumentPane, useDispatch, useSelector } from '../../store';
import { Strings } from '../../utils';
import './style.css';

const DOCUMENT_URL = 'https://bba1ca93.developers-6w5.pages.dev/script/introduction/';

export const Document = () => {
  const { isDocumentPaneOpen } = useSelector(editorState, shallowEqual);
  const dispatch = useDispatch();
  const { color } = useTheme() as any;
  const iframeRef = useRef<any>();

  const IconComponent = isDocumentPaneOpen ? ChevronDownOutlined : ChevronUpOutlined;

  const onClick = () => {
    dispatch(toggleDocumentPane());
  }

  return (
    <div className='documentPaneWrapper'>
      <div className="documentPaneHeader">
        <div className="documentPaneTitle">
          {t(Strings.script_document)}
        </div>
        <div className="documentPaneRight">
          <ColumnLinktableFilled 
            color={color.textCommonTertiary} 
            className='documentLinkBtn'
            onClick={() => window.open(DOCUMENT_URL, '_blank')}
          />
          <IconComponent 
            color={color.textCommonTertiary} 
            className='documentToggleBtn'
            onClick={onClick}
          />
        </div>
      </div>
      <div className='documentPaneContainer'>
        <iframe
          ref={iframeRef}
          title="users-html"
          src={DOCUMENT_URL}
          sandbox="allow-same-origin allow-scripts"
          frameBorder={'none'}
        />
      </div>
    </div>
  )
}
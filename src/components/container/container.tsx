import { Allotment } from 'allotment';
import { shallowEqual } from 'react-redux';
import React, { useEffect, useState, FC } from 'react';
import { useCloudStorage, useViewport } from '@apitable/widget-sdk';
import { EditorPanel, PreviewPanel, ConsolePanel, DocumentPanel, Header, WelcomePanel } from '../../components';
import { editorState, useSelector } from '../../store';
import { 
  ATTACH_PANEL_MAX_HEIGHT, 
  ATTACH_PANEL_MIN_HEIGHT, 
  ATTACH_PANEL_DEFAULT_SIZES, 
  EDITOR_INITIAL_CODE, 
  EDITOR_PANEL_MIN_HEIGHT,
} from './constant';
import "allotment/dist/style.css";
import "./style.css";

export const Container: FC = () => {
  const { isFullscreen } = useViewport();
  const [sourceCode, setSourceCode] = useCloudStorage('scriptData', EDITOR_INITIAL_CODE);
  const [inputCode, setInputCode] = useState(sourceCode);
  const { 
    isEditorPaneOpen, 
    isConsolePaneOpen,
    isDocumentPaneOpen,
    isRunning,
    isInitialize,
  } = useSelector(editorState, shallowEqual);

  useEffect(() => {
    setSourceCode(inputCode);
  }, [inputCode]);

  return (
    <div style={{ height: '100%' }}>
      <Header 
        code={inputCode} 
        isRunning={isRunning}
        isInitialize={isInitialize}
        isEditorPaneOpen={isEditorPaneOpen}
      />

      <div style={{ height: 'calc(100% - 48px)' }}>
        <Allotment>
          {
            isEditorPaneOpen &&
            <Allotment 
              vertical 
              onVisibleChange={function noRefCheck() {}} 
              defaultSizes={ATTACH_PANEL_DEFAULT_SIZES}
              className={'allotment'}
            >
              <Allotment.Pane minSize={EDITOR_PANEL_MIN_HEIGHT}>
                <EditorPanel 
                  code={inputCode}
                  onChange={(value) => setInputCode(value)} 
                />
              </Allotment.Pane>

              <Allotment.Pane 
                minSize={ATTACH_PANEL_MIN_HEIGHT}
                maxSize={isDocumentPaneOpen ? ATTACH_PANEL_MAX_HEIGHT : ATTACH_PANEL_MIN_HEIGHT} 
              >
                <DocumentPanel />
              </Allotment.Pane>
            </Allotment>
          }

          {
            (isFullscreen || !isEditorPaneOpen) &&
            <Allotment 
              vertical 
              onVisibleChange={function noRefCheck() {}} 
              defaultSizes={ATTACH_PANEL_DEFAULT_SIZES}
            >
              <Allotment.Pane>
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <PreviewPanel />
                  {
                    isInitialize && <WelcomePanel code={inputCode} /> 
                  }
                </div>
              </Allotment.Pane>

              <Allotment.Pane
                minSize={ATTACH_PANEL_MIN_HEIGHT}
                maxSize={isConsolePaneOpen ? ATTACH_PANEL_MAX_HEIGHT : ATTACH_PANEL_MIN_HEIGHT}
              >
                <ConsolePanel />
              </Allotment.Pane>
            </Allotment>
          }
        </Allotment>
      </div>
    </div>
  );
};
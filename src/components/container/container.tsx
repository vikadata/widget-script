import React, { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useCloudStorage, useViewport } from '@vikadata/widget-sdk';
import { CodeEditor, Previewer, ConsolePane, Header, Document, Welcome } from '../../components';
import { editorState, useSelector } from '../../store';
import { Allotment } from 'allotment';
import "allotment/dist/style.css";
import "./style.css";

const INITIAL_CODE = `output.text('Hello World');`;

export const Container: React.FC = () => {
  const [sourceCode, setSourceCode] = useCloudStorage('scriptData', INITIAL_CODE);
  const [inputCode, setInputCode] = useState(sourceCode);
  const { isFullscreen } = useViewport();
  const { 
    isEditorPaneOpen, 
    isConsolePaneOpen,
    isDocumentPaneOpen,
    isRunning,
    isInitialize
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
              defaultSizes={[600, 400]}
              className={'allotment'}
            >
              {/* 代码编辑器 */}
              <Allotment.Pane minSize={100}>
                <CodeEditor 
                  code={inputCode}
                  onChange={(value) => setInputCode(value)} 
                />
              </Allotment.Pane>

              {/* API 文档 */}
              <Allotment.Pane 
                minSize={36}
                maxSize={isDocumentPaneOpen ? 520 : 36} 
              >
                <Document />
              </Allotment.Pane>
            </Allotment>
          }

          {
            (isFullscreen || !isEditorPaneOpen) &&
            <Allotment 
              vertical 
              onVisibleChange={function noRefCheck() {}} 
              defaultSizes={[600, 400]}
            >
              {/* 预览区 */}
              <Allotment.Pane>
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Previewer />
                  {
                    isInitialize && <Welcome code={inputCode} /> 
                  }
                </div>
              </Allotment.Pane>

              {/* console 面板 */}
              <Allotment.Pane
                minSize={36}
                maxSize={isConsolePaneOpen ? 520 : 36}
              >
                <ConsolePane />
              </Allotment.Pane>
            </Allotment>
          }
        </Allotment>
      </div>
    </div>
  );
};
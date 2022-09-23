import { Hook } from 'console-feed';
import { shallowEqual } from 'react-redux';
import React, { useContext, useEffect, useRef } from 'react';
import { IWidgetContext, widgetMessage } from '@vikadata/widget-sdk';
import { htmlTemplate } from './html_template';
import { InputClass, OutputClass } from '../../render_components';
import { editorState, updateLogs, updateRunningState, useDispatch, useSelector } from '../../store';
import { Container, Iframe } from './styled';

export const PreviewPanel = () => {
  const dispatch = useDispatch();
  const { bundledCode, isRunning, isInitialize } = useSelector(editorState, shallowEqual);
  const { WidgetContext, Script } = window['_@vikadata/widget-sdk'];
  const context = useContext<IWidgetContext>(WidgetContext);
  const iframeRef = useRef<any>();

  useEffect(() => {
    if (!isRunning) return;
    iframeRef.current.srcdoc = htmlTemplate;
	}, [isRunning])

  useEffect(() => {
    if (!isRunning && !isInitialize) {
      iframeRef.current.contentWindow.postMessage('globalDisabled()', '*')
    };
	}, [isRunning, isInitialize])

  useEffect(() => {
    window.onmessage = function (response: MessageEvent) {
      if (response.data && response.data.source === "iframe") {
        let errorObject = {
          method: "error",
          id: Date.now(),
          data: [`${response.data.message}`],
        };
        dispatch(updateLogs(errorObject));
      }
    };
  }, []);

  const onLoad = async () => {
    const iframeWindow = iframeRef.current.contentWindow;
    iframeWindow.componentMap = new Map();
    iframeWindow.globalStop = () => {
      dispatch(updateRunningState(false));
    }
    iframeWindow.globalDisabled = () => {
      (iframeWindow.componentMap as Map<string, Function>).forEach((fn) => fn());
    }
    iframeWindow.space = new Script.Space(context);
    iframeWindow.input = new InputClass(iframeWindow, async (datasheet) => {
      const result = await (widgetMessage as any).expandRecordPicker(datasheet.id);
      return result.data[0];
    });
    iframeWindow.output = new OutputClass(iframeWindow);
    Hook(
      iframeWindow.console,
      (log) => dispatch(updateLogs(log)),
      false
    );
    iframeWindow.postMessage(bundledCode, '*');
  }

  return (
    <Container>
      <Iframe
        ref={iframeRef}
        title="users-html"
        srcDoc={htmlTemplate}
        sandbox="allow-same-origin allow-scripts allow-popups"
        frameBorder={'none'}
        onLoad={onLoad}
      />
    </Container>
  )
}
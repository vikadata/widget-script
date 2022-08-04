import React, { useContext, useEffect, useRef } from 'react';
import { Hook } from 'console-feed';
import { Input, Output } from '../../utils';
import { htmlTemplate } from './html_template';
import { editorState, updateLogs, updateRunningState, useDispatch, useSelector } from '../../store';
import { IWidgetContext } from '@vikadata/widget-sdk';
import { shallowEqual } from 'react-redux';
import './style.css';

export const Previewer = () => {
  const dispatch = useDispatch();
  const { bundledCode, isRunning, isInitialize } = useSelector(editorState, shallowEqual);
  const { WidgetContext, Script } = window['_@vikadata/widget-sdk'];
  const context = useContext<IWidgetContext>(WidgetContext);
  const iframeRef = useRef<any>();

  useEffect(() => {
    if (!isRunning) return;
		iframeRef.current.srcdoc = htmlTemplate;
	}, [isRunning, bundledCode])

  useEffect(() => {
    if (!isRunning && !isInitialize) {
      iframeRef.current.contentWindow.postMessage('globalDisabled()', '*')
    };
	}, [isRunning, isInitialize])

  return (
    <div className='preview-wrapper'>
      <iframe
        ref={iframeRef}
        title="users-html"
        srcDoc={htmlTemplate}
        sandbox="allow-same-origin allow-scripts"
        frameBorder={'none'}
        onLoad={async () => {
          const iframeDocument = iframeRef.current.contentWindow.document;
          iframeRef.current.contentWindow.globalStop = () => {
            dispatch(updateRunningState(false));
          }
          iframeRef.current.contentWindow.globalDisabled = () => {
            const inputs = iframeDocument.getElementsByTagName("input");
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].disabled = true;
            }
            const buttons = iframeDocument.getElementsByTagName("button");
            for (let i = 0; i < buttons.length; i++) {
              buttons[i].disabled = true;
            }
          }
          iframeRef.current.contentWindow.space = new Script.Space(context);
          iframeRef.current.contentWindow.input = new Input(iframeDocument);
          iframeRef.current.contentWindow.output = new Output(iframeDocument);
          Hook(
            iframeRef.current.contentWindow.console,
            (log) => {
              dispatch(updateLogs(log));
            },
            false
          );
          iframeRef.current.contentWindow.postMessage(bundledCode, '*')
        }}
      />
    </div>
  )
}
import { useDebounceFn } from 'ahooks';
import { editor } from 'monaco-editor';
import React, { useEffect, useRef } from 'react';
import MonacoEditor, { OnMount, useMonaco } from '@monaco-editor/react'
import { useMeta } from '@vikadata/widget-sdk';
import { Loading, useTheme, rgba2hex, ThemeName } from "@vikadata/components";
import { allTypes } from './lib_types';
import './style.css';

let typesLoaded = false;

export const EditorPanel = (props) => {
  const { code, onChange } = props;
  const meta = useMeta();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monaco = useMonaco();
  const { color } = useTheme() as any;
  const { run } = useDebounceFn((value) => {
    onChange(value)
  });
  const themeName = meta.theme;
  const monacoTheme = themeName === ThemeName.Dark ? 'vs-dark' : 'vs';

  const onEditorDidMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;
    const bgColor = rgba2hex(color.bgCommonLower);
    monaco.editor.defineTheme("customTheme", {
      base: monacoTheme,
      inherit: true,
      rules: [{ background: bgColor, token: "" }],
      colors: {
        "editor.background": bgColor,
      },
    });
    monaco.editor.setTheme("customTheme");
		editor.onDidChangeModelContent(() => {
      run(editor.getValue())
		}) 
	}

  useEffect(() => {
    if (typesLoaded || !monaco) {
      return;
    }

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [1375, 1378],
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
    });

    allTypes.map(([path, content]) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        content,
        path
      );
    });

    typesLoaded = true;
  }, [monaco]);

  return (
    <MonacoEditor
      value={code}
      height="100%"
      theme={monacoTheme}
      language="typescript"
      onMount={onEditorDidMount}
      loading={<Loading />}
      options={{
        // 迷你地图
        minimap: {
        	enabled: false,
        },
        folding: false,
        showUnused: true,
        tabSize: 2,
        fontSize: 13,
        tabCompletion: 'on',
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        scrollbar: { verticalScrollbarSize: 10, verticalSliderSize: 10 },
      }}
    />
  )
}
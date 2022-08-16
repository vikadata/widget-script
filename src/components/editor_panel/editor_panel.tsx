import { useDebounceFn } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import MonacoEditor, { OnMount, useMonaco } from '@monaco-editor/react'
import { useMeta } from '@vikadata/widget-sdk';
import { Loading, useTheme, rgba2hex, ThemeName } from "@vikadata/components";
import './style.less';

// External API
import lodashIndex from '!raw-loader!@types/lodash/index.d.ts';
import lodashCommon from '!raw-loader!@types/lodash/common/common.d.ts';
import lodashArray from '!raw-loader!@types/lodash/common/array.d.ts';
import lodashCollection from '!raw-loader!@types/lodash/common/collection.d.ts';
import lodashDate from '!raw-loader!@types/lodash/common/date.d.ts';
import lodashFunction from '!raw-loader!@types/lodash/common/function.d.ts';
import lodashLang from '!raw-loader!@types/lodash/common/lang.d.ts';
import lodashMath from '!raw-loader!@types/lodash/common/math.d.ts';
import lodashNumber from '!raw-loader!@types/lodash/common/number.d.ts';
import lodashObject from '!raw-loader!@types/lodash/common/object.d.ts';
import lodashSeq from '!raw-loader!@types/lodash/common/seq.d.ts';
import lodashString from '!raw-loader!@types/lodash/common/string.d.ts';
import lodashUtil from '!raw-loader!@types/lodash/common/util.d.ts';

// Script API
import space from '!raw-loader!@vikadata/widget-sdk/dist/script/space.d.ts';
import datasheetTyping from '!raw-loader!@vikadata/widget-sdk/dist/script/datasheet.d.ts';
import viewTyping from '!raw-loader!@vikadata/widget-sdk/dist/script/view.d.ts';
import fieldTyping from '!raw-loader!@vikadata/widget-sdk/dist/script/field.d.ts';
import recordTyping from '!raw-loader!@vikadata/widget-sdk/dist/script/record.d.ts';

// Render API
import input from '!raw-loader!../../render_components/input.interface.ts';
import output from '!raw-loader!../../render_components/output.interface.ts';

let typesLoaded = false;

const spaceTyping = `
  ${space}
  export = space;
  export as namespace space;
  declare const space: Space;
`;

const inputTyping = `
  ${input}
  export = input;
  export as namespace input;
  declare const input: Input;
`;

const outputTyping = `
  ${output}
  export = output;
  export as namespace output;
  declare const output: Output;
`;

const allTypes = [
  ['@types/lodash/index.d.ts', lodashIndex],
  ['@types/lodash/common/common.d.ts', lodashCommon],
  ['@types/lodash/common/array.d.ts', lodashArray],
  ['@types/lodash/common/collection.d.ts', lodashCollection],
  ['@types/lodash/common/date.d.ts', lodashDate],
  ['@types/lodash/common/function.d.ts', lodashFunction],
  ['@types/lodash/common/lang.d.ts', lodashLang],
  ['@types/lodash/common/math.d.ts', lodashMath],
  ['@types/lodash/common/number.d.ts', lodashNumber],
  ['@types/lodash/common/object.d.ts', lodashObject],
  ['@types/lodash/common/seq.d.ts', lodashSeq],
  ['@types/lodash/common/string.d.ts', lodashString],
  ['@types/lodash/common/util.d.ts', lodashUtil],
  ['@types/vikadata/space.d.ts', spaceTyping],
  ['@types/vikadata/datasheet.d.ts', datasheetTyping],
  ['@types/vikadata/view.d.ts', viewTyping],
  ['@types/vikadata/field.d.ts', fieldTyping],
  ['@types/vikadata/record.d.ts', recordTyping],
  ['@types/vikadata/input.d.ts', inputTyping],
  ['@types/vikadata/output.d.ts', outputTyping],
];

export const EditorPanel = (props) => {
  const { code, onChange } = props;
  const meta = useMeta();
  const editorRef = useRef<any>();
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

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true
    });

    allTypes.map(([path, content]) => {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
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
      language="javascript"
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
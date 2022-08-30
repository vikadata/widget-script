import { createSlice } from '@reduxjs/toolkit';
import { Message } from 'console-feed/lib/definitions/Component';
import { RootState } from '../store';

export interface IEditorSlice {
  isRunning: boolean; // 是否处于运行状态
  isInitialize: boolean; // 是否是初始状态
  bundledCode: string;
  logs: Message[];
  isEditorPaneOpen: boolean;
  isConsolePaneOpen: boolean;
  isDocumentPaneOpen: boolean;
}

const initialState: IEditorSlice = {
  isRunning: false,
  isInitialize: true,
  bundledCode: '',
  logs: [],
  isEditorPaneOpen: false,
  isConsolePaneOpen: false,
  isDocumentPaneOpen: false,
};

/**
 * Reducer
 */
export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateBundledCode: (state: IEditorSlice, { payload }) => {
      state.bundledCode = payload;
    },
    updateLogs: (state: IEditorSlice, { payload }) => {
      state.logs = [...state.logs, payload];
    },
    updateInitializeState: (state: IEditorSlice, { payload }) => {
      state.isInitialize = payload;
    },
    updateRunningState: (state: IEditorSlice, { payload }) => {
      state.isRunning = payload;
    },
    clearLogs: (state: IEditorSlice) => {
      state.logs = [];
    },
    toggleEditorPane: (state: IEditorSlice) => {
      state.isEditorPaneOpen = !state.isEditorPaneOpen;
    },
    toggleConsolePane: (state: IEditorSlice) => {
      state.isConsolePaneOpen = !state.isConsolePaneOpen;
    },
    toggleDocumentPane: (state: IEditorSlice) => {
      state.isDocumentPaneOpen = !state.isDocumentPaneOpen;
    },
  }
})

export default editorSlice.reducer;

/**
 * Actions
 */
export const {
  updateBundledCode,
  updateLogs,
  updateInitializeState,
  updateRunningState,
  clearLogs,
  toggleEditorPane,
  toggleConsolePane,
  toggleDocumentPane,
} = editorSlice.actions;

/**
 * Selectors
 */
export const editorState = (state: RootState) => state.editor;
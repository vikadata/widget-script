import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import editorSlice, { IEditorSlice } from './features/editorSlice';

export const store: EnhancedStore<{ editor: IEditorSlice}> = configureStore({
  reducer: {
    editor: editorSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = any;
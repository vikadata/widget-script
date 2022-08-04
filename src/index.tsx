import React from 'react';
import { initializeWidget } from '@vikadata/widget-sdk';
import { store } from './store';
import { Provider } from 'react-redux';
import { Container } from './components';

export const Main: React.FC = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

initializeWidget(Main, process.env.WIDGET_PACKAGE_ID);

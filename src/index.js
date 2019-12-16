import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/Reactotron.Config';
import store from './store';

import Routes from './routes';
import NavigationService from './services/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#7159c1"
        animated="false"
      />
      <Routes
        ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}
      />
    </Provider>
  );
}

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Cart from './pages/Cart';

import Header from './components/Header';

import colors from './styles/colors';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Cart,
      // Main,
    },
    {
      defaultNavigationOptions: navigation => ({
        header: <Header {...navigation} />,
        headerStyle: {
          backgroundColor: colors.dark,
        },
        headerTintColor: '#FFF',
      }),
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
    }
  )
);

export default Routes;

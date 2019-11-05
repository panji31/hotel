import React from 'react';
import LoginScreen from '../src/screen/LoginScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        }

    }
);
export default createAppContainer(AppNavigator);
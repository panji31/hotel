import React from 'react';
import { Icon } from 'native-base';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import CheckinScreen from '../src/screen/CheckinScreen';
import RoomScreen from '../src/screen/RoomScreen';
import CustomerScreen from '../src/screen/CustomerScreen';
import SettingScreen from '../src/screen/SettingScreen';


const TabNavigator = createBottomTabNavigator({
    Checkin: {
        screen: CheckinScreen,
        navigationOptions: {
            tabBarLabel: 'Checkin',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="check" size={20} color='grey' style={{ color: 'grey' }} />
            )
        }
    },
    Room: {
        screen: RoomScreen,
        navigationOptions: {
            tabBarLabel: 'ROOM',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="th-large" size={20} color='grey' style={{ color: 'grey' }} />
            )
        }
    },
    Customer: {
        screen: CustomerScreen,
        navigationOptions: {
            tabBarLabel: 'CUSTOMER',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="group" size={20} color='grey' style={{ color: 'grey' }} />
            )
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: 'SETTING',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="gears" size={20} color='grey' style={{ color: 'grey' }} />
            )
        }
    },
}, {
    tabBarOptions: {
        activeTintColor: '#f06d63',
        inactiveTintColor: 'grey',
        style: {
            backgroundColor: 'white',
        }, indicatorStyle: {
            backgroundColor: 'f06d63',
        },

    }
},
    {
        initialRouteName: 'Checkin',
    }
);

const AppNavigator = createStackNavigator(
    {
        Checkin: {
            screen: TabNavigator,
            navigationOptions: {
                header: null
            }
        }

    },
    {
        initialRouteName: 'Checkin',
        defaultNavigationOptions: {
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
);

export default createAppContainer(AppNavigator);
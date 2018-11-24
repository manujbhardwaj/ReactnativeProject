import React from 'react';

import {createStackNavigator} from 'react-navigation';

import Login from './Login';
import Register from './Register';
import Home from './Home';

const Router = createStackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    Home: {screen: Home},
});

export default Router;
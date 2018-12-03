import React from 'react';

import {createStackNavigator} from 'react-navigation';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Game from './Game';
import Game2 from './Game2';
import Images from './Images';

const Router = createStackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    Home: {screen: Home},
    Game: {screen: Game},
    Game2: {screen: Game2},
    Images: {screen: Images},
});

export default Router;
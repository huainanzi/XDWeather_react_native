/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createAppContainer,createStackNavigator} from 'react-navigation'
import HomePage from './js/pages/HomePage'

const appNavigator = createStackNavigator({
  homePage:{
    screen:HomePage
  }
},{
  initialRouteName:'homePage'
});

const appContainer = createAppContainer(appNavigator);

export default appContainer;
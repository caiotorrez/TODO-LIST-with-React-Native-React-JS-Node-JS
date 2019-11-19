import React, { Component } from 'react'
import { Animated, Easing, Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import store from './services/redux/redux.root';
import Home from './home';
import Task from './task';
import NewTask from './screens/newTasks';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerLeft: null,
      headerRight: null,
      headerStyle: {
        backgroundColor: '#525bff',
      },
    })
  },
  Profile: {
    screen: Task,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { elevation: 0 },
    })
  },
  NewTask: {
    screen: NewTask,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Lista',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#525bff',
      },
      headerRight: () => (
        <TouchableOpacity >
          <Text style={{ color: '#fff', fontSize: 17, marginRight: 20 }} color="#fff">Feito</Text>
        </TouchableOpacity>
      )
    })
  },
}, {
  initialRouteName: 'Home',
  transitionConfig: () => (transitionConfiguration)
});

let Navigation = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

const transitionConfiguration = {
  transitionSpec: {
    duration: 600,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;

    const height = layout.initHeight;
    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });

    return { opacity, transform: [{ translateY }] };
  },
}